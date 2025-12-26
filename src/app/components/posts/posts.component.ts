import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';


@Component({
    selector:'app-post',
    standalone:true,
    imports: [],
    templateUrl:'./posts.component.html'
})
export class PostComponent{
    constructor(private masterService: MasterService){
    }

    ngOnInit(){
        this.masterService.getUsers().subscribe(data => {
            console.log('data..',data)
        })
    }
}