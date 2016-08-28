// import {Directive, Attribute, ElementRef, DynamicComponentLoader} from '@angular/core';
// //import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
// import { Config } from '../config/app.settings';

// @Directive({
//   selector: 'custom-router-outlet'
// })

// export class CustomRouterOutlet extends RouterOutlet {
//   publicRoutes: any;
//   private parentRouter: Router;
//   constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
//  _parentRouter: Router, @Attribute(‘name’) nameAttr: string, private _config: Config) {
//     super(_elementRef, _loader, _parentRouter, nameAttr);
//     this.parentRouter = _parentRouter;
//   }
//   activate(instruction: ComponentInstruction) {
//     return this._config.load().then(() => { return super.activate(instruction) })
//  }
//   }