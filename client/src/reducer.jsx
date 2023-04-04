import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export const initialState = {
    basket: [],
    user:'',
    sidebar:false,
};
const reducer =  (state,action) =>{
    switch(action.type)
    {
        case "ADD_TO_CART" :
            if(state.user!='')
            {
               axios.post('/add_to_basket',{item:action.item,user:action.pay})
                .then(res=>
                    {
                        console.log(res.data);
                        res.data.forEach((it,index)=>{state.basket[index]=it});
                        console.log('done');
                    });
               // .catch(console.log('not added succesfully'));
            }
            else{
                alert("you must sign in to add items to cart");
            }
        return {
                 ...state,
               // basket: [...state.basket,action.item], //this way of doing work independently on back and frontend is not correct, since isme id hi
                //add nhi ho rha.
        };

        case "REMOVE_FROM_CART":
        const new_list=[...state.basket];
             console.log(state.user);
            if(action.pay==1)
            {
                new_list.splice(action.index,1);
                axios.post('/delete_cart_item',{idx:action.id,user:state.user,title:action.title})
                .then(res=>
                    {
                        console.log(res.data[0]);
                        res.data.forEach((it,index)=>{state.basket[index]=it});
                    })
                .catch(err=>{if(err) console.log(err); 
                    else console.log('success')});
                ;
                action.pay=0;
                //ye sab isiliye add kiya since react k strict mode me dispatch reducer ko 2 bar call krta, since
                //dono bar reducer ka op same rehna chahiye, par humare me me aisa nhi, isiliye flag bananya,
                //dusre baar call krega to flag zero hogaya hnece andar nhi aya.
                //agr strictmode ko hata diya to chaelga iske bina bhi, par strict mode is better for testing.

            }
            return{
                ...state,
                basket:new_list
            };
        case  "ADD_USER" :
            return{
                ...state,
                user: action.pay

            }
        case "REMOVE_USER":
            return {
                ...state,
                user:'',
                basket:[]
            };
        case 'GET_CART':
            console.log('inside reducer');
            axios.get('/get_cart')
            .then(res=>{
                if(res.data!="empty")
                {
                    console.log(res.data[0].price);
                    console.log(res.data[0].obj_id);
                    //so this res.data is an array of objects, not an array.
                    //state.basket=[...state.basket,res.data];
                    res.data.forEach((it,index)=>{state.basket[index]=it});
                    console.log(state.basket);
                    // console.log(res.data);
                    console.log(state.basket);
                }
            }).catch(err=>console.log(err));
            return {
                ...state,
            };
            //idk how?? but ye wala error resolve hogya, ig since pehle wala return nhi kr rha tha isiliye ye error aa rha tha.
            //thus reducer me humesha return karwa.
        case 'sidebar_toggle':
            console.log("inside toggle");
            return{
                ...state,
                sidebar:!(state.sidebar)
            }
            
        default:
            console.log('default');
    }
};

export default reducer;

//now remove from cart me hum backend se remove krne wala add krenge.
