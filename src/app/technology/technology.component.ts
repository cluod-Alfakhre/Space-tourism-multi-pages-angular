import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';
import { technologyObj } from '../models/technology-obj.model';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit, OnDestroy {

  subs!:Subscription;

  componentArray!:[];

  currentObj:technologyObj={
    "name": "Launch vehicle",
    "images": {
      "portrait": "./assets/technology/image-launch-vehicle-portrait.jpg",
      "landscape": "./assets/technology/image-launch-vehicle-landscape.jpg"
    },
    "description": "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!"
  };

  changeImg:boolean=false;
  constructor(private mainService:MainService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.windowResize();
    window.addEventListener('resize',()=>{
      this.windowResize();
    })
    this.subs=this.mainService.getData().subscribe((res:any)=>{
      this.componentArray=res.technology;
      this.getCurrentObj();
    })
  }

  getCurrentObj(){

    this.route.queryParams.subscribe((qp:any)=>{

      if(!!qp.obj){
        this.animateImg('out');
        this.currentObj=this.componentArray.filter( (item:technologyObj) => item.name == qp.obj )[0];
        this.activeBullet(qp.obj);
        this.animateImg('in');
      }else{
        this.animateImg('in')
      }

    })

  }
  
  activeBullet(theClass:string){

    theClass=theClass.split(' ')[0];
    document.querySelectorAll('.bullets li').forEach(el=>el.classList.remove('active'));
    document.querySelector('.'+theClass)!.classList.add('active');

  }

  animateImg(direction:string){

    const componentImg=document.querySelector('.img img');

    if(direction=='in'){
      //the setTimeout 300 cuase the new img need to wain until the previos img done its duration
      setTimeout(() => {

        componentImg!.animate(
          [
             { opacity: "0"},
             { opacity: "1"},
          ],
          { duration: 300, fill: "forwards" }
       );

      }, 300);

    }

    else if(direction=="out"){

        componentImg!.animate(
          [
             { opacity: "1"},
             { opacity: "0"},
          ],
          { duration: 300, fill: "forwards" }
       );

    }
  };

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
  windowResize(){
      if( document.documentElement.clientWidth <= 1000 ){
        this.changeImg=true
      }else{
        this.changeImg=false;
      }
  }

}
