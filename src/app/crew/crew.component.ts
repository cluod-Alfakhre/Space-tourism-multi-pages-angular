import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import {MainService} from "../main.service"
import { CrewMember } from '../models/crew-member.model';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent implements OnInit, OnDestroy {

  subs!:Subscription;
  componentArray!:[];
  currentObj:CrewMember={
    name:'Douglas Hurley',
    bio:"Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
    role:'Commander',
    images:{
      png:"./assets/crew/image-douglas-hurley.png",
      webp:'./assets/crew/image-mark-shuttleworth.webp'
    }
  };

  constructor(private mainService:MainService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.subs=this.mainService.getData().subscribe( (res:any)=>{
      this.componentArray=res.crew;
      this.setCurrentObj();
    })
  }

  setCurrentObj(){

    this.route.queryParams.subscribe( (qp:any)=>{

      if(!!qp.obj){

        this.animateImg('out');
        this.currentObj=this.componentArray.filter( (item:CrewMember) => item.role.includes(qp.obj) )[0];
        this.animateImg('in');
        this.activeBullets(qp.obj);

      }else{
        this.animateImg('in');
      }

    })

  }

  animateImg(direction:string){

    const componentImg=document.querySelector('.img img');

    if(direction=='in'){
      //the setTimeout 300 cuase the new img need to wain until the previos img done its duration
      setTimeout(() => {

        componentImg!.animate(
          [
             { opacity: "0", transform: "translateY(200px) rotateX(-60deg)" },
             { opacity: "1", transform: "translateY(0px) rotateX(0deg)" },
          ],
          { duration: 300, fill: "forwards" }
       );

      }, 300);

    }

    else if(direction=="out"){

        componentImg!.animate(
          [
             { opacity: "1", transform: "translateY(0px) rotateX(0deg)" },
             { opacity: "0", transform: "translateY(-200px) rotateX(60deg)" },
          ],
          { duration: 300, fill: "forwards" }
       );

    }
  };

  activeBullets(theClass:string){
    document.querySelectorAll('.bullets li').forEach(el => el.classList.remove('active'))
    document.querySelector('.'+theClass)!.classList.add('active')
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
