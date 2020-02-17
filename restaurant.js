/*to do: 
    fetch long description
    window.onclick to close modal when the screen is clicked
    filter through options (vegetarian, available, on discount)
    sort (price low to high)
    responsive images
    animations
*/
fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)

function createCategories(data){
    data.forEach(function(oneCat){
        const a=document.createElement("a");
        a.textContent=oneCat;
        a.setAttribute("href", `#${oneCat}`);

        document.querySelector("#myLinks").appendChild(a);

        const section = document.createElement("section");
        section.id=oneCat;
        const h2 = document.createElement("h2");
        h2.textContent=oneCat;
        section.appendChild(h2);
        document.querySelector("main").appendChild(section)
    })
    getProducts();
}
function getProducts(){
    fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        showData(data)
    })
}
function showData(jsonData){
    console.log(jsonData);
    jsonData.forEach(showSingleDish) 
}
var vegetarian=[];
var vegetarianVisible=false;
var discount=[];
var available=[];

function showSingleDish(dish){
    const template=document.querySelector("#dishTemplate").content;
    const copy = template.cloneNode(true);
    copy.querySelector("article").id="Art"+dish.id;
    copy.querySelector("h3").textContent=dish.name;
    //to do: fix responsive images
    copy.querySelector(".course-image").src="https://kea-alt-del.dk/t5/site/imgs/"+"medium/"+dish.image+"-md.jpg";
    
    if(dish.soldout){
        copy.querySelector(".soldout").style.visibility="visible";
    }else{
        copy.querySelector(".soldout").style.visibility="hidden";
        available.push(dish.id);
    }
    
    if (dish.discount){
        copy.querySelector(".price-discount span").textContent=dish.price;
        const newPrice=Math.round(dish.price-dish.price*dish.discount/100);
        copy.querySelector(".price-discount span").textContent=newPrice;
        copy.querySelector(".price-full span").textContent=dish.price;
        copy.querySelector(".price-full").style.textDecoration="line-through";
        discount.push(dish.id);
        console.log(discount)
    }else{
        copy.querySelector(".price-discount").remove();
        copy.querySelector(".price-full span").textContent=dish.price;
    }
    
    copy.querySelector(".why").textContent=dish.shortdescription;
    copy.querySelector(".read-more").id="Btn"+dish.id;
    
    copy.querySelector(".modal").id="Modal"+dish.id;
    copy.querySelector(".close").id="Close"+dish.id;
    copy.querySelector(".modal-image").src="https://kea-alt-del.dk/t5/site/imgs/"+"medium/"+dish.image+"-md.jpg";
    copy.querySelector("h4").textContent=dish.name;
    if(dish.vegetarian){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode("vegetarian"));
        copy.querySelector(".modalInfo").appendChild(li);
        vegetarian.push(dish.id);
    }
    if(dish.alcohol){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(`alcohol: ${dish.alcohol}%`));
        copy.querySelector(".modalInfo").appendChild(li);
    }
    document.querySelector(`#${dish.category}`).appendChild(copy);
}
function showModal(modal){
    var courseid=modal.id.replace('Btn','');
    document.getElementById(`Modal${courseid}`).style.display="block";
}
function hideModal(modal){
    var courseid=modal.id.replace('Close','');
    document.getElementById(`Modal${courseid}`).style.display="none";
} 
/*
function filter(thisid){
    var toggleGroup=thisid;
    switch(toggleGroup){
        case "vegetarian":
            vegetarian.forEach(testing);
            if (vegetarianVisible==true){
                vegetarianVisible=false;
            }
            else{
                vegetarianVisible=true
            }
            break;
        case "discount":
            console.log("two")
            break;
        case "available":
            
    }
    
}
function testing(oneArticle){
    console.log(`Art${oneArticle}`);
    if (vegetarianVisible==true){
    document.getElementById(`Art${oneArticle}`).style.display="none";
    }else{
    document.getElementById(`Art${oneArticle}`).style.display="block";
    vegetarianVisible=true
    }
}
*/