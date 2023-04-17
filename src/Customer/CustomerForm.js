import React from 'react';
import request from 'superagent';
export default class CustomerForm extends React.Component{
   constructor(props) {
      super(props)

      this.state = {
         name: 'テスト太郎',
         email: 'sample@email.com',
      };

      this.handleClick = this.handleClick.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
   }

   componentWillReceiveProps(nextProps){
      if(nextProps.editData){
         this.setState({
            name: nextProps.editData.name,
            email: nextProps.editData.email,
         });
      }
   }

   handleClick(e){
      request
         .post('./ajax.php')
         .type('form')
         .send({
            type: this.props.status,
            name: this.state.name,
            email: this.state.email,
            editid: this.props.editData.id
         })
         .end((err, res) => {
            this.props.drawList();
         });
   }

   onChangeName(e){
      this.setState({ name: e.target.value });
   }

   onChangeEmail(e){
      this.setState({ email: e.target.value });
   }

   render(){
      return (
         <form>
            <fieldset>
               <legend>{this.props.status === 'add' ? '新規登録' : 'ID：' + this.props.editData.id}</legend>
               <div>
                  <label htmlFor="name">名前：</label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     required="true"
                     value={this.state.name || ''}
                     onChange={this.onChangeName} />
               </div>
               <div>
                  <label htmlFor="email">Email：</label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     value={this.state.email || ''}
                     onChange={this.onChangeEmail} />
               </div>
               <input
                  type="button"
                  value='登録'
                  disabled={this.props.status === 'add' ? false : true}
                  onClick={this.handleClick} />
               &nbsp;
               <input
                  type="button"
                  value='更新'
                  disabled={this.props.status === 'edit' ? false : true}
                  onClick={this.handleClick} />
            </fieldset>
         </form>
      );
   }
}