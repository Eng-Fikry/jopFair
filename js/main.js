//  function of data

async function customersAndTransactions(){

    const customers= await fetch(`http://localhost:3000/customers`)
    const cData= await customers.json()


    const transactions= await fetch(`http://localhost:3000/transactions`)
    const tData= await transactions.json()

    display(cData,tData)
    

}
//call
customersAndTransactions()

//  function to display data

function display(cData,tData){

    let data=``

    for(let i=0;i<cData.length;i++){
        for(let k=0; k<tData.length;  k++){

            if(tData[k].customer_id==cData[i].id){
                
                data +=`
                <tr>
                    <td>${tData[k].id}</td>
                    <td>${cData[i].name}</td>
                    <td>${cData[i].id}</td>
                    <td>${tData[k].amount}</td>
                    <td>${tData[k].date}</td>
                    <td ><button data-id="${cData[i].id}"   data-name="${cData[i].name}"   class="btn btn-primary">Graph</button></td>
                </tr>
                `
                
            }
        }
            
        
    }
    document.getElementById("table").innerHTML= data

    char(tData)
    search(cData,tData)
    
}
//search
function search(cData,tData){

    document.querySelectorAll("input").forEach((input)=>{

        input.addEventListener("keyup",()=>{
    
            const tybe =input.getAttribute("data-search")
            const search= input.value
            
            //search by name
            if(tybe=='name'){
                let name=""
                for(let i=0;i<cData.length;i++){
                    for(let k=0;  k<tData.length;  k++){
                        if(cData[i].name.toLowerCase().includes(search.toLowerCase())){
                        if(tData[k].customer_id==cData[i].id){
                            
                            name +=`
                            <tr>
                                <td>${tData[k].id}</td>
                                <td>${cData[i].name}</td>
                                <td>${cData[i].id}</td>
                                <td>${tData[k].amount}</td>
                                <td>${tData[k].date}</td>
                                <td><button data-id="${cData[i].id}"   data-name="${cData[i].name}"  class="btn btn-primary">Graph</button></td>
                            </tr>
                            
                            `
                            
                        }
                    }
            
                    }
                }

                document.getElementById("table").innerHTML= name
                char(tData)

    
            }
            //search by amount
            else{
                let amount=""
                 for(let i=0;i<cData.length;i++){
                    for(let k=0;k<tData.length;  k++){
                        if((JSON.stringify(tData[k].amount)).includes(search)){
                        if(tData[k].customer_id==cData[i].id){
                            
                            
                            amount +=`
                            <tr>
                                <td>${tData[k].id}</td>
                                <td>${cData[i].name}</td>
                                <td>${cData[i].id}</td>
                                <td>${tData[k].amount}</td>
                                <td>${tData[k].date}</td>
                                <td><button data-id="${cData[i].id}"  data-name="${cData[i].name}"  class="btn btn-primary">Graph</button></td>
                            </tr>
                            
                            `
                            
                        }
                        
                    }
                    
            
                    }
                        
            
                }

                document.getElementById("table").innerHTML= amount
                char(tData)
            }
    
        })
    })
}

function char(tData) {
    document.querySelectorAll("button").forEach((click)=>{

        click.addEventListener("click",()=>{
            
            const naem= click.getAttribute("data-name")
            const id= click.getAttribute("data-id")
            
           const customerTransactions = tData.filter(t => t.customer_id == id);
            const data = {
                labels: customerTransactions.map(t => t.date),
                datasets: [
                    {
                        name: naem + "'s Transaction Amount",
                        values: customerTransactions.map(t => t.amount),
                    },
                    
                ]
            }
            
            const chart = new frappe.Chart("#chart", {  
                                                        
                title: `${naem} Chart`,
                data: data,
                type: 'axis-mixed', 
                height: 250,
                colors: ['#7cd6fd', '#743ee2']
            })
       
        
        })
    })
    
}
