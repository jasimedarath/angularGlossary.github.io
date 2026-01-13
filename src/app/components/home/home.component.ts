import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface TechStack {
  name: string;
  icon: string;
  description: string;
  route: string;
  color: string;
  available: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  techStacks: TechStack[] = [
    {
      name: 'Angular',
      icon: 'https://angular.io/assets/images/logos/angular/angular.svg',
      description: 'A comprehensive Angular glossary covering components, services, routing, state management, and modern features.',
      route: '/angular/gettingstarted',
      color: '#dd0031',
      available: true
    },
    {
      name: 'React',
      icon: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png',
      description: 'Learn React fundamentals, hooks, context, and modern patterns.',
      route: '/react/jsx',
      color: '#61dafb',
      available: true
    },
    {
      name: 'Next.js',
      icon: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png',
      description: 'Master Next.js with SSR, SSG, API routes, and App Router.',
      route: '/nextjs/gettingstarted',
      color: '#000000',
      available: true
    },
    {
      name: 'Node.js',
      icon: 'https://nodejs.org/static/images/logo.svg',
      description: 'Explore Node.js backend development, modules, async programming, and server-side concepts.',
      route: '/nodejs/gettingstarted',
      color: '#339933',
      available: true
    },
    {
      name: 'Express.js',
      icon: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png',
      description: 'Master Express.js web framework, routing, middleware, and REST API development.',
      route: '/expressjs/gettingstarted',
      color: '#000000',
      available: true
    },
    {
      name: 'MongoDB',
      icon: 'https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_wordmark_logo_icon_146425.png',
      description: 'Learn MongoDB database, CRUD operations, Mongoose ODM, and data modeling.',
      route: '/mongodb/gettingstarted',
      color: '#47A248',
      available: true
    },
    {
      name: 'TypeScript',
      icon: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png',
      description: 'Deep dive into TypeScript types, interfaces, generics, and advanced patterns.',
      route: '/typescript/gettingstarted',
      color: '#3178c6',
      available: true
    },
    {
      name: 'JavaScript',
      icon: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png',
      description: 'Master JavaScript fundamentals, ES6+ features, and asynchronous programming.',
      route: '/javascript/basics',
      color: '#F7DF1E',
      available: true
    },
    {
      name: 'Vue.js',
      icon: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png',
      description: 'Learn Vue.js composition API, reactivity, and component architecture. (Coming Soon)',
      route: '/vue',
      color: '#42b883',
      available: false
    }
  ];

  constructor(private router: Router) {}

  navigateTo(stack: TechStack) {
    if (stack.available) {
      this.router.navigate([stack.route]);
    }
  }
}
