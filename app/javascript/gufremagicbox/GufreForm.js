import React from 'react';
import Dropzone from 'react-dropzone';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import $ from 'jquery';

export default class GufreForm extends React.Component {
    constructor(){
        super();
        this.state = { files: [] }
    }

    onDrop(files) {
        this.setState({
            files
        });
    }

    render() {
        return (
            <section>
                <form encType="multipart/form-data" action="/homes" acceptCharset="UTF-8" method="post" className="formReactTable">
                    {/* CSRF token + UTF-8 */}
                    <input name="utf8" type="hidden" value="&#x2713;" />
                    <input type="hidden" name="authenticity_token" value={ $('meta[name="csrf-token"]').attr('content') } />

                    <div className="tag-system">
                        <TextField
                            InputProps={{ placeholder: "Séparer les tags d'une virgule" }}
                            rows={2}
                            style={{width: '40%'}}
                            name="home[tags]"
                            required={ true }/>
                    </div>

                    <div className="file-system">
                        <div className="file-upload">

                            <br />
                            {/* Multi upload */}
                            <div className="dropzone">
                                <Dropzone onDrop={ this.onDrop.bind(this)}
                                          name="home[fichiers][]"
                                          required={ true } >
                                    <p>Clique ou <br />glisse des fichiers</p>
                                </Dropzone>
                            </div>
                        </div>

                        <div className="file-preview">
                            <h2>Fichiers déposés :</h2>
                            <ul>
                                { this.state.files.map(f => <li>{ f.name } ({f.size} octets)</li>) }
                            </ul>
                        </div>
                    </div>

                    <div className="file-submit">
                        <Button raised type="submit" color="primary">
                            Uploader
                        </Button>
                    </div>
                </form>

            </section>
        )
    }
}