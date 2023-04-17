import React from 'react';
import request from 'superagent';
export default class CustomerTable extends React.Component{
   constructor(props) {
      super(props)

      this.deleteList = this.deleteList.bind(this);
   }

   deleteList(e){
      request
         .post('./ajax.php')
         .type('form')
         .send({
            'type': 'delete',
            'id': e.target.dataset.id
         })
         .end((err, res) => {
            this.props.drawList();
         });
   }

   formatDate(date){
      if(!date)return '';
      const dt = new Date(date);
      return `${dt.getFullYear()}年${dt.getMonth()+1}月${dt.getDate()}日 ${dt.getHours()}時${dt.getMinutes()}分${dt.getSeconds()}秒`;
   }

   render(){
      const style = {
         table:{borderCollapse:'collapse',marginTop:'10px',width:'70%'},
         thead: {backgroundColor:'#adff2f'},
         tr: {borderBottom: '1px solid black'}
      };

      return(
         <table style={style.table}>
            <thead style={style.thead}>
               <tr>
                  <th>ID</th><th>名前</th><th>Email</th><th>登録日</th><th>変更日</th><th></th><th></th>
               </tr>
            </thead>
            <tbody>
               {this.props.datas.map((data) => {
                  return (
                     <tr key={data.id} style={style.tr}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{this.formatDate(data.created)}</td>
                        <td>{this.formatDate(data.modified)}</td>
                        <td><input type="button" value="変更" onClick={this.props.henkouButton} data-id={data.id}/></td>
                        <td><input type="button" value="削除" onClick={this.deleteList} data-id={data.id}/></td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      );
   }
}