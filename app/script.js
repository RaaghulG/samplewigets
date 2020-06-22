var processedJSON = {};
window.onload = function () {
  ZFAPPS.extension.init().then(function(App){
      ZFAPPS.get('invoice').then(async function(responseJson) {
        /*responseJson = responseJson['invoice'];*/
          processedJSON = responseJson;
            console.log(responseJson);
          if(responseJson.invoice.customer_id){
            let contacts =  {
            url: 'https://books.zoho.com/api/v3/contacts',
            method: 'GET',
            url_query: [{
              key: "authtoken",
              value: "fa00e98373d2be124d2abddc28ab33bc"
            },
            {
              key: "organization_id",
              value: "708364208"
            }]
          };
          contacts.url = contacts.url.concat(`/${responseJson.invoice.customer_id}`);
          let { contact } = await ZFAPPS.request(contacts).then(function(json) {
            return JSON.parse(json.data.body);
            
          });
          console.log(contact);
        contactsName = document.getElementById('contact');
        contactsName.innerText = `${contact.contact_name}`;
        processedJSON = responseJson;
        console.log(processedJSON);

        let invoices =  {
          url: 'https://books.zoho.com/api/v3/invoices',
          method: 'GET',
          url_query: [{
            key: "authtoken",
            value: "fa00e98373d2be124d2abddc28ab33bc"
          },
          {
            key: "organization_id",
            value: "708364208"
          },
          {
            key: "customer_id",
            value: responseJson.invoice.customer_id
          }]
        };
        console.log(responseJson.invoice.customer_id);
          console.log(invoices);
          
          let invoice  = await ZFAPPS.request(invoices).then(function(json) {
            return JSON.parse(json.data.body);
            
          });
          console.log(invoice.invoices);
          contactsName = document.getElementById('contact');
        contactsName.innerText = `${contact.contact_name}`;
    
        console.log(invoice.invoices[0].date);
        for ( element of invoice.invoices) {
          invoiceList=[]
        }
      
        for (let element of invoice.invoices) {
         
             invoicesList= {
              "Date" : element.date,
              "Invoice#" :element.invoice_number,
              "Status" : element.current_sub_status,
              "Amount" : element.total,
              "Balance Due" : element.balance
            }
          invoiceList.push(invoicesList);
        }
        console.log(invoiceList);
        
        function generateTableHead(table, data) {
          let thead = table.createTHead();
          let row = thead.insertRow();
          for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
          }
        }
        
        function generateTable(table, data) {
          for (let element of data) {
            let row = table.insertRow();
            for (key in element) {
              
              let cell = row.insertCell();
              let text = document.createTextNode(element[key]);
              cell.appendChild(text);
            }
          }
        }
        
        let table = document.querySelector("table");
        let data = Object.keys(invoiceList[0]);
        generateTableHead(table, data);
        generateTable(table, invoiceList);
        let row = document.getElementsByTagName("tr");
        invoiceId=[]
        for (let i = 0; i < row.length; i++) {
          var cell = row[i];
          cell.onclick = function () {
            var rowId = this.rowIndex;
            console.log(rowId-1);
            invoiceId.push(invoice.invoices[rowId-1].invoice_id)
            updateInvoice(invoiceId)
          }
        }
        function updateInvoice(invoiceId){
        for(let i=0;i<invoiceId.length;i++){
          console.log(invoiceId[i]);
          let selectedInvoices =  {
            url: 'https://books.zoho.com/api/v3/invoices',
            method: 'GET',
            url_query: [{
              key: "authtoken",
              value: "fa00e98373d2be124d2abddc28ab33bc"
            },
            {
              key: "organization_id",
              value: "708364208"
            }]
          };
          selectedInvoices.url = selectedInvoices.url.concat(`/${invoiceId[i]}`);
          console.log(selectedInvoices);
          let selectedInvoice  =  ZFAPPS.request(selectedInvoices).then(function(json) {
          
            return JSON.parse(json.data.body);
          });
          debugger;
          console.log(selectedInvoice);
          console.log(selectedInvoice.invoices);
          console.log(selectedInvoice.invoices.line_items)
          processedJSON.line_items.push(selectedInvoice.invoices.line_items);
          console.log(processedJSON);
        }

      }
        
      }
        else{
          contactsName = document.getElementById('contact');
        contactsName.innerText = "Select the Customer";
        }
      }).catch(function(error) {
          console.log(error);
      });
    
      ZFAPPS.set('invoice.discount','20%').then(async function(responseJson) {
        responseJson = responseJson['invoice'];
        console.log(responseJson.discount);
     /* App.instance.on('ON_CHANGE', async function(response) {
           if(responseJson.invoice.customer_id){
            let contacts =  {
              url: 'https://books.zoho.com/api/v3/contacts',
              method: 'GET',
              url_query: [{
                key: "authtoken",
                value: "fa00e98373d2be124d2abddc28ab33bc"
              },
              {
                key: "organization_id",
                value: "708364208"
              }]
            };
            contacts.url = contacts.url.concat(`/${responseJson.invoice.customer_id}`);
            let { contact } = await ZFAPPS.request(contacts).then(function(json) {
              return JSON.parse(json.data.body);
            });
            console.log(contact);
          contactsName = document.getElementById('contact');
          contactsName.innerText = `${contact.contact_name}`;
          processedJSON = responseJson;
          console.log(processedJSON);

          let invoices =  {
            url: 'https://books.zoho.com/api/v3/invoices',
            method: 'GET',
            url_query: [{
              key: "authtoken",
              value: "fa00e98373d2be124d2abddc28ab33bc"
            },
            {
              key: "organization_id",
              value: "708364208"
            },
            {
              key: "customer_id",
              value: responseJson.invoice.customer_id
            }]
          };

          let invoice  = await ZFAPPS.request(invoices).then(function(json) {
            return JSON.parse(json.data.body);   
          });

          console.log(invoice.invoices);
          contactsName = document.getElementById('contact');
          contactsName.innerText = `${contact.contact_name}`;
      
          console.log(invoice.invoices[0].date);
          for ( element of invoice.invoices) {
            invoiceList=[]
          }
        
          for (let element of invoice.invoices) {
              invoicesList= {
                "Date" : element.date,
                "Invoice#" :element.invoice_number,
                "Status" : element.current_sub_status,
                "Amount" : element.total,
                "Balance Due" : element.balance
              }
            invoiceList.push(invoicesList);
          }
          console.log(invoiceList);
          
          function generateTableHead(table, data) {
            let thead = table.createTHead();
            let row = thead.insertRow();
            for (let key of data) {
              let th = document.createElement("th");
              let text = document.createTextNode(key);
              th.appendChild(text);
              row.appendChild(th);
            }
          }
          
          function generateTable(table, data) {
            for (let element of data) {
              let row = table.insertRow();
              for (key in element) {
                
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
              }
            }
          }
          
          let table = document.querySelector("table");
          let data = Object.keys(invoiceList[0]);
          generateTableHead(table, data);
          generateTable(table, invoiceList);
          
        }
        else{
          contactsName = document.getElementById('contact');
        contactsName.innerText = "Select the Customer";
        }
      }).catch(function(error) {
          console.log(error);
        });*/
      });
});
}