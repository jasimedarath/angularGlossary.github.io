import { Component, AfterViewChecked } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

declare var Prism: any;

@Component({
  selector: 'app-react-lifecycle',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './react-lifecycle.component.html',
  styleUrl: './react-lifecycle.component.scss'
})
export class ReactLifecycleComponent implements AfterViewChecked {
  
  classLifecycle = `// Class Component Lifecycle Methods
import React, { Component } from 'react';

class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('1. Constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('4. componentDidMount - Component mounted');
    // API calls, subscriptions, timers
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('5. shouldComponentUpdate');
    return true; // Return false to prevent re-render
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('6. getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('7. componentDidUpdate - Component updated');
  }

  componentWillUnmount() {
    console.log('8. componentWillUnmount - Cleanup');
    // Cleanup: remove listeners, cancel requests
  }

  render() {
    console.log('3. Render');
    return <div>Count: {this.state.count}</div>;
  }
}`;

  useEffectBasics = `// useEffect - Equivalent to componentDidMount, componentDidUpdate, componentWillUnmount
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Runs after every render (no dependency array)
  useEffect(() => {
    console.log('Effect runs after every render');
  });

  // Runs once on mount (empty dependency array)
  useEffect(() => {
    console.log('Component mounted');
    fetchUser(userId).then(setUser);
  }, []); // Empty array = componentDidMount

  // Runs when userId changes
  useEffect(() => {
    console.log('userId changed');
    fetchUser(userId).then(setUser);
  }, [userId]); // Dependency array

  // Cleanup function (componentWillUnmount)
  useEffect(() => {
    const subscription = subscribeToUser(userId);
    
    return () => {
      // Cleanup runs before unmount
      subscription.unsubscribe();
    };
  }, [userId]);

  return <div>{user?.name}</div>;
}`;

  useEffectPatterns = `// Common useEffect Patterns

// 1. Fetching Data
useEffect(() => {
  let cancelled = false;

  async function fetchData() {
    const response = await fetch(\`/api/users/$\{id}\`);
    const data = await response.json();
    if (!cancelled) {
      setData(data);
    }
  }

  fetchData();

  return () => {
    cancelled = true; // Prevent state update if unmounted
  };
}, [id]);

// 2. Event Listeners
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// 3. Timers
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  return () => clearInterval(timer);
}, []);

// 4. Subscriptions
useEffect(() => {
  const subscription = dataSource.subscribe(handleData);
  return () => subscription.unsubscribe();
}, [dataSource]);`;

  useLayoutEffect = `// useLayoutEffect - Runs synchronously after DOM mutations
import React, { useLayoutEffect, useRef } from 'react';

function Tooltip() {
  const tooltipRef = useRef();

  // useLayoutEffect runs before browser paint
  // Use for DOM measurements or synchronous updates
  useLayoutEffect(() => {
    const { height } = tooltipRef.current.getBoundingClientRect();
    
    // Position tooltip based on measurements
    if (height > 100) {
      tooltipRef.current.style.top = '-10px';
    }
  });

  return <div ref={tooltipRef}>Tooltip content</div>;
}

// useEffect vs useLayoutEffect
// useEffect: Async, after paint (most cases)
// useLayoutEffect: Sync, before paint (DOM measurements)`;

  lifecycleComparison = `// Class Lifecycle vs Hooks Comparison

// componentDidMount
class Example extends Component {
  componentDidMount() {
    // Mount logic
  }
}

function Example() {
  useEffect(() => {
    // Mount logic
  }, []);
}

// componentDidUpdate
class Example extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      // Update logic
    }
  }
}

function Example({ id }) {
  useEffect(() => {
    // Update logic
  }, [id]);
}

// componentWillUnmount
class Example extends Component {
  componentWillUnmount() {
    // Cleanup
  }
}

function Example() {
  useEffect(() => {
    return () => {
      // Cleanup
    };
  }, []);
}`;

  bestPractices = `// Lifecycle Best Practices

// ✓ Clean up effects to prevent memory leaks
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);

// ✓ Declare dependencies correctly
useEffect(() => {
  doSomething(prop1, prop2);
}, [prop1, prop2]); // Include all dependencies

// ✗ Don't omit dependencies
useEffect(() => {
  doSomething(prop1); // prop1 used but not in deps
}, []); // WRONG!

// ✓ Use multiple effects for different concerns
useEffect(() => {
  // User subscription
  const userSub = subscribeToUser();
  return () => userSub.unsubscribe();
}, [userId]);

useEffect(() => {
  // Analytics
  trackPageView();
}, [pathname]);

// ✓ Avoid infinite loops
useEffect(() => {
  setCount(count + 1); // WRONG! Creates infinite loop
}, [count]);

// Better: Use functional update
useEffect(() => {
  setCount(c => c + 1); // Functional update, no dependency
}, []);`;

  ngAfterViewChecked(): void {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }
}
