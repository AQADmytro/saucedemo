import fs from 'fs';
import path from 'path';

export default function globalSetup(): void {
  const testResultsDir = path.resolve(__dirname, 'test-results');
  if (fs.existsSync(testResultsDir)) {
    fs.rmSync(testResultsDir, { recursive: true, force: true });
  }
}
