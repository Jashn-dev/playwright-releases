import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class DiagnosticReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    for (const error of result.errors) {
      if ((error as any).errorContext) {
        console.log('Diagnostic context for failed assertion:');
        console.log((error as any).errorContext);
        // Contains ARIA snapshot, element state, etc.
      }
    }
  }
}

export default DiagnosticReporter;
