import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router,ActivationStart  } from '@angular/router';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  
  subs!:Subscription;
  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {

    this.subs=this.router.events.pipe(

      filter(event => event instanceof ActivationStart)// that event is triggered at every change of route and i need it to get the path that i'm currently in to use it as class to the element
                                                      // and by filtering i told it to giv the "ActivationStart" 
      ).subscribe((event:any)=> {

        this.ActiveNavLink(event.snapshot.routeConfig.path.toLowerCase());// the function that take the path as a parameter

      });
    //console.log(this.route)

  }
  ActiveNavLink(theClass:string){
    document.querySelectorAll('.nav-list li').forEach(el => el.classList.remove('active'));
    document.querySelector('.'+theClass)?.classList.add('active');
  }
  
  toggleNavList(action:string){// this function opening the side menu in the mobile screen

    action =='open'?
    document.querySelector('.nav-list')?.classList.add('active')
    :document.querySelector('.nav-list')?.classList.remove('active');
    
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }
}
