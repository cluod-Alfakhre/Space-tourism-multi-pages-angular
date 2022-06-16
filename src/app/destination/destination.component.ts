import { OnDestroy, Component, ElementRef, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { mainDataModel } from '../models/mainData.model';
import { ActivatedRoute } from '@angular/router';
import { PlanetModel } from '../models/planet.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit, OnDestroy {

  subs!:Subscription;
  componentArray!:[];
  currentObj:PlanetModel={//to avoid errors of undefined i set initial values to the properies
    name:'Moon',
    images:{png:'./assets/destination/image-moon.png',webp:''},
    description:'See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.',
    distance:'384,400 km',
    travel:'3 days'};

  constructor(private mainService:MainService, private route:ActivatedRoute,private elem: ElementRef) { 
    
  }

  ngOnInit(): void {
    this.subs=this.mainService.getData().subscribe( (res:mainDataModel) => {
      this.componentArray=res.destinations;
      this.setCurrentObj();
    } )
  }
  
  setCurrentObj(){
    this.route.queryParams.subscribe(async (qp: {}) => {
      if(!!qp['obj' as keyof {}]){

        this.animateImg('out');//the old img to be out animate
        this.currentObj =this.componentArray.filter((el: any) => el.name == qp['obj' as keyof {}])[0];
        this.ActivePlanentNav(this.currentObj.name)
        this.animateImg('in');//the new img to be in animate
      }else{
        this.animateImg('in');
      }
    })
  };

  animateImg(direction:string){

    const componentImg=document.querySelector('.img img');

    if(direction=='in'){
      //the setTimeout 300 cuase the new img need to wain until the previos img done its duration
      setTimeout(() => {

        componentImg!.animate(
          [
             { opacity: "0", transform: "translateX(200px) rotateY(-60deg) scale(0.6)" },
             { opacity: "1", transform: "translateX(0px) rotateY(0deg) scale(1)" },
          ],
          { duration: 300, fill: "forwards" }
       );

      }, 300);

    }

    else if(direction=="out"){

        componentImg!.animate(
          [
             { opacity: "1", transform: "translateX(0px) rotateY(0deg) scale(1)" },
             { opacity: "0", transform: "translateX(-200px) rotateY(60deg) scale(0.6)" },
          ],
          { duration: 300, fill: "forwards" }
       );

    }
  } ;

  ActivePlanentNav(theClass:string){
    document.querySelectorAll('.list li').forEach(el => el.classList.remove('active'));
    document.querySelector('.'+theClass)?.classList.add('active');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
