# Angular Glossary - Complete Developer Reference

A comprehensive Angular reference application covering concepts from beginner to expert level, including all the latest features from Angular 17+ and Angular 21.

## 🚀 Features

This application serves as a complete glossary and reference guide for Angular developers at all levels. It includes detailed explanations, code examples, and best practices for every major Angular concept.

### 📚 Topics Covered

#### Core Concepts
- **Modules** - NgModules, standalone components, and module architecture
- **Components** - Component lifecycle, communication patterns, and best practices
- **Directives** - Structural and attribute directives, custom directives
- **Pipes** - Built-in and custom pipes, pure vs impure pipes
- **Services** - Dependency injection, service patterns, singleton services

#### Modern Angular (16+)
- **Signals** - Reactive primitives, computed signals, effects, signal inputs
- **Control Flow** - New `@if`, `@for`, `@switch` syntax replacing structural directives
- **Deferrable Views** - `@defer` blocks for lazy loading and code splitting
- **Dependency Injection** - Modern `inject()` function, injection tokens, hierarchical DI
- **SSR & Hydration** - Server-side rendering, non-destructive hydration, transfer state

#### Routing & Navigation
- **Routing** - Route configuration, lazy loading, route guards
- **Guards** - CanActivate, CanDeactivate, functional guards

#### HTTP & State Management
- **Interceptors** - HTTP interceptors, error handling, request/response transformation
- **RxJS** - Observables, operators, reactive patterns
- **NgRx** - State management, actions, reducers, effects, selectors

#### Forms & Validation
- **Forms** - Reactive forms, template-driven forms, custom validators, dynamic forms

#### Advanced Concepts
- **Lifecycle Hooks** - All component lifecycle hooks with use cases
- **Change Detection** - Zone.js, OnPush strategy, manual change detection

#### Testing & Build
- **Unit Testing** - Jasmine, Karma, testing components, services, and pipes
- **Webpack** - Build optimization, bundle analysis, code splitting

#### UI Libraries
- **Angular Material** - Material Design components, theming, accessibility

## 🎯 Key Features of This Glossary

### Comprehensive Coverage
- ✅ All Angular core concepts explained in detail
- ✅ Angular 16+ features (Signals, standalone components)
- ✅ Angular 17+ features (New control flow, deferrable views, SSR improvements)
- ✅ Angular 21 features and best practices
- ✅ Real-world examples and use cases
- ✅ Performance optimization tips
- ✅ Best practices and common pitfalls

### Learning-Friendly Structure
- 📖 Each topic organized in easy-to-navigate tabs
- 💡 Syntax references with code examples
- 🎨 Multiple examples from basic to advanced
- ⚡ Performance tips and optimization strategies
- ⚠️ Common pitfalls and how to avoid them
- ✅ Best practices for production applications

### Modern Angular Features

#### Signals (Angular 16+)
- Writable signals with `signal()`
- Computed signals for derived state
- Effects for side effects
- Signal-based inputs with `input()` and `model()`
- Linked signals for advanced patterns
- RxJS interoperability with `toSignal()` and `toObservable()`

#### Built-in Control Flow (Angular 17+)
- `@if`, `@else if`, `@else` - Better than `*ngIf`
- `@for` with required tracking - Replaces `*ngFor`
- `@switch`, `@case`, `@default` - Cleaner than `ngSwitch`
- Better performance and type checking
- Automatic migration available

#### Deferrable Views (Angular 17+)
- `@defer` blocks for lazy loading
- Multiple trigger conditions (viewport, interaction, hover, idle, timer)
- Prefetching strategies
- Loading, placeholder, and error states
- Significant bundle size reduction

#### Modern Dependency Injection
- `inject()` function for cleaner code
- Functional composition support
- Optional dependencies and injection flags
- Custom injection tokens
- Hierarchical DI patterns

#### SSR & Hydration (Angular 16+)
- Server-side rendering for better SEO and performance
- Non-destructive hydration (no content flashing)
- Event replay for better UX
- Transfer state for avoiding duplicate requests
- Platform detection for browser/server-specific code

## 🛠️ Technologies Used

- **Angular 18** (with support for Angular 21 features)
- **TypeScript** - Type-safe development
- **Angular Material** - UI components
- **PrismJS** - Code syntax highlighting
- **RxJS** - Reactive programming
- **SCSS** - Styling

## 🏃 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd angularGlossary.github.io

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

### Build

```bash
# Build for production
npm run build

# Build and watch for changes
npm run watch

# Run tests
npm test
```

## 📖 How to Use

1. **Navigate Topics**: Click on any topic in the navigation menu
2. **Explore Tabs**: Each topic has multiple tabs covering different aspects
3. **Code Examples**: All examples are syntax-highlighted and ready to use
4. **Copy & Learn**: Code snippets can be copied directly to your projects

## 🎓 Learning Path

### Beginners
Start with Core Concepts:
1. Components
2. Modules
3. Directives
4. Pipes
5. Services

### Intermediate
Move to Modern Features:
1. Signals
2. Control Flow
3. Dependency Injection
4. Routing
5. Forms

### Advanced
Master Advanced Topics:
1. Deferrable Views
2. SSR & Hydration
3. Change Detection
4. RxJS
5. NgRx
6. Performance Optimization

## 🌟 What's New in Angular 21

This glossary includes comprehensive coverage of:
- Latest control flow enhancements
- Signal improvements and new APIs
- SSR and hydration optimizations
- Performance improvements
- Build system updates
- TypeScript 5.4+ features

## 🤝 Contributing

Contributions are welcome! If you find any issues or want to add more content:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Angular Material for UI components
- The Angular community for best practices and patterns

## 📬 Contact

For questions or suggestions, please open an issue in the repository.

---

**Happy Learning! 🚀**

Built with ❤️ for the Angular community
