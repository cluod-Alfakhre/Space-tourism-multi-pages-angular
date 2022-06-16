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
      filter(event => event instanceof ActivationStart)
    ).subscribe((event:any)=> {
      this.ActiveNavLink(event.snapshot.routeConfig.path.toLowerCase());
  });
    //console.log(this.route)
  }
  ActiveNavLink(theClass:string){
    document.querySelectorAll('.nav-list li').forEach(el => el.classList.remove('active'));
    document.querySelector('.'+theClass)?.classList.add('active');
  }
  
  toggleNavList(action:string){

    action =='open'?
    document.querySelector('.nav-list')?.classList.add('active')
    :document.querySelector('.nav-list')?.classList.remove('active');
    
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }
}
