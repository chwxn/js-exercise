
import {foo} from './a'

export function bar(){
    if(Math.random()>0.5){
        foo();
    }
}