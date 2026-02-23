import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { zipSync, strToU8 } from 'fflate';

import { DownloadAllButton } from './DownloadAllButton';
import type { GeneratedFile } from '@/lib/generateContext';

jest.mock('fflate', () => ({
  zipSync: jest.fn(() => new Uint8Array([1, 2, 3])),
  strToU8: jest.fn(() => new Uint8Array([0])),
}));

const mockRevokeObjectURL = jest.fn();
const mockCreateObjectURL = jest.fn(() => 'blob:mock-url');

beforeEach(() => {
  jest.clearAllMocks();
  URL.createObjectURL = mockCreateObjectURL;
  URL.revokeObjectURL = mockRevokeObjectURL;

  // Suppress jsdom's lack of <a>.click() support
  jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
});

const sampleFiles: GeneratedFile[] = [
  { path: '.github/copilot-instructions.md', content: '# Instructions' },
  { path: '.github/instructions/components.instructions.md', content: '## Components' },
  { path: '.vscode/settings.json', content: '{}' },
];

describe('DownloadAllButton', () => {
  it('renders with the correct file count', () => {
    render(<DownloadAllButton files={sampleFiles} />);
    expect(screen.getByRole('button', { name: /download all \(3\)/i })).toBeInTheDocument();
  });

  it('is disabled when files array is empty', () => {
    render(<DownloadAllButton files={[]} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is enabled when files are present', () => {
    render(<DownloadAllButton files={sampleFiles} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('calls zipSync with all file paths as keys', () => {
    render(<DownloadAllButton files={sampleFiles} />);
    fireEvent.click(screen.getByRole('button'));

    expect(zipSync).toHaveBeenCalledTimes(1);
    const entries = (zipSync as jest.Mock).mock.calls[0][0] as Record<string, Uint8Array>;
    expect(Object.keys(entries)).toEqual([
      '.github/copilot-instructions.md',
      '.github/instructions/components.instructions.md',
      '.vscode/settings.json',
    ]);
  });

  it('calls strToU8 for each file content', () => {
    render(<DownloadAllButton files={sampleFiles} />);
    fireEvent.click(screen.getByRole('button'));

    expect(strToU8).toHaveBeenCalledTimes(3);
    expect(strToU8).toHaveBeenCalledWith('# Instructions');
    expect(strToU8).toHaveBeenCalledWith('## Components');
    expect(strToU8).toHaveBeenCalledWith('{}');
  });

  it('creates a Blob and triggers an anchor download', () => {
    render(<DownloadAllButton files={sampleFiles} />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledTimes(1);
  });

  it('sets the download filename to copilot-context.zip', () => {
    const anchorSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
    render(<DownloadAllButton files={sampleFiles} />);

    let capturedDownload = '';
    Object.defineProperty(HTMLAnchorElement.prototype, 'download', {
      set(value: string) { capturedDownload = value; },
      get() { return capturedDownload; },
      configurable: true,
    });

    fireEvent.click(screen.getByRole('button'));

    expect(capturedDownload).toBe('copilot-context.zip');
    anchorSpy.mockRestore();
  });

  it('revokes the object URL after triggering the download', () => {
    render(<DownloadAllButton files={sampleFiles} />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('does nothing when the button is clicked with no files', () => {
    render(<DownloadAllButton files={[]} />);
    fireEvent.click(screen.getByRole('button'));

    expect(zipSync).not.toHaveBeenCalled();
    expect(mockCreateObjectURL).not.toHaveBeenCalled();
  });
});
