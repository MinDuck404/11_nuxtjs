// utils/performance.ts

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private timers: Map<string, number> = new Map();
  private apiCalls: Array<{name: string, duration: number, timestamp: number}> = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(name: string): void {
    this.timers.set(name, performance.now());
  }

  endTimer(name: string): number {
    const startTime = this.timers.get(name);
    if (!startTime) {
      console.warn(`Timer "${name}" not found`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.timers.delete(name);
    
    console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  logApiCall(name: string, duration: number): void {
    this.apiCalls.push({
      name,
      duration,
      timestamp: Date.now()
    });
    
    console.log(`API Call "${name}": ${duration.toFixed(2)}ms`);
  }

  getApiCallStats(): {
    totalCalls: number;
    totalTime: number;
    averageTime: number;
    calls: Array<{name: string, duration: number, timestamp: number}>;
  } {
    const totalTime = this.apiCalls.reduce((sum, call) => sum + call.duration, 0);
    const averageTime = this.apiCalls.length > 0 ? totalTime / this.apiCalls.length : 0;

    return {
      totalCalls: this.apiCalls.length,
      totalTime,
      averageTime,
      calls: [...this.apiCalls]
    };
  }

  logPerformanceReport(): void {
    const stats = this.getApiCallStats();
    console.group('Performance Report');
    console.log(`Total API Calls: ${stats.totalCalls}`);
    console.log(`Total Time: ${stats.totalTime.toFixed(2)}ms`);
    console.log(`Average Time: ${stats.averageTime.toFixed(2)}ms`);
    console.log('Call Details:', stats.calls);
    console.groupEnd();
  }

  clear(): void {
    this.timers.clear();
    this.apiCalls = [];
  }
}

// Performance decorator cho API calls
export function withPerformanceTracking<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  name: string
): T {
  return (async (...args: any[]) => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.startTimer(name);
    
    try {
      const result = await fn(...args);
      const duration = monitor.endTimer(name);
      monitor.logApiCall(name, duration);
      return result;
    } catch (error) {
      monitor.endTimer(name);
      throw error;
    }
  }) as T;
}

// Hook để monitor component lifecycle
export function usePerformanceMonitor(componentName: string) {
  const monitor = PerformanceMonitor.getInstance();
  
  const startMeasurement = (operation: string) => {
    monitor.startTimer(`${componentName}-${operation}`);
  };
  
  const endMeasurement = (operation: string) => {
    return monitor.endTimer(`${componentName}-${operation}`);
  };
  
  return {
    startMeasurement,
    endMeasurement,
    monitor
  };
}
