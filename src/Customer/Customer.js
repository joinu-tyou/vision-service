import React from 'react';
import request from 'superagent';

import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';

export default class Customer extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         datas: [],
         status: 'add',
         editData: ''
      };

      this.drawList = this.drawList.bind(this);
      this.henkouButton = this.henkouButton.bind(this);
   }

   componentDidMount(){
      this.drawList();
   }

   drawList(){
      request
         .post('./ajax.php')
         .type('form')
         .send({type: 'list'})
         .end((err, res) => {
            this.setState({
               datas: res.body,
               status: 'add',
            });
         });
   }

   henkouButton(e){
      request
         .post('./ajax.php')
         .type('form')
         .send({
            type: 'edit_target',
            id: e.target.dataset.id,
         })
         .end((err, res) => {
            this.setState({
               status:'edit',
               editData: res.body,
            });
         });
   }

   render(){
      const propsForm = {status: this.state.status, editData: this.state.editData, drawList: this.drawList}
      const propsTable = {datas: this.state.datas, henkouButton: this.henkouButton, drawList: this.drawList}

      return (
         <div>
            <CustomerForm {...propsForm}/>
            <CustomerTable {...propsTable}/>
         </div>
      );
   }
}
