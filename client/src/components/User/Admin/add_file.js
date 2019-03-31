import React, {Component} from "react";
import UserLayout from "../../../hoc/user";
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {Link} from "react-router-dom";

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';


class AddFile extends Component {
    constructor() {
        super();
        this.state = {
            formSucess: false,
            formError : false,
            files: [],
            uploading: false,
            loading: true
        }
    }

    onDrop = (files) =>{
        this.setState({ uploading: true})
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file",files[0]);
        axios.post('/api/users/uploadfile',formData,config)
        .then(response => {
           if(response.data.success){
               this.setState({
                   formSucess: true,
                   formError: false,
                   uploading: false
               }, () => {
                   setTimeout(() => {
                       this.setState({ formSucess: true })
                   }, 2000)
               })
           }
        })
    }

    componentDidMount(){
        axios.get('/api/users/admin_files')
        .then(response => {
            this.setState({files : response.data})
        })
    }

    showFilesList = () => {
        this.state.files ?
            this.state.files.map((item, i) => (
                <li key={i}>
                    <Link to={`/api/users/download/${item}`} target="_blank">{item}</Link>
                </li>
            ))
            :
            <h1>Notfound</h1>;
    }

    render(){
        return(
            <UserLayout> 
            <h1>Upload File</h1>
            <div>
                   <div>
                        <Dropzone
                            onDrop={(e) => this.onDrop(e)}
                            multiple={false}
                            className="dropzone_box"
                        >
                            <div className="wrap">
                                <FontAwesomeIcon
                                    icon={faPlusCircle}
                                />
                            </div>
                        </Dropzone>
                    </div>
                    {
                        this.state.uploading ?
                            <div className="dropzone_box" style={{
                                textAlign: 'center',
                                paddingTop: '60px'
                            }}>
                                <CircularProgress
                                    style={{ color: '#1d00c6' }}
                                    thickness={7}
                                />
                            </div>
                            : null
                    }
                    <div style={{clear:'both'}}>
                        {this.state.formSucess ? <div className="form_success">Success</div>:null }
                        {this.state.formError ? <div className="error_label">Please check your data</div> : ''}
                    </div>
                    <hr />
                    <div>
                        <h1>Upload</h1>
                        <ul>
                            {this.showFilesList()}
                        </ul>
                    </div>

            </div>
            </UserLayout>
        )
    }
}
export default AddFile;