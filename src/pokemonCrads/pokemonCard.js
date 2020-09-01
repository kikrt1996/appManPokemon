import React, { Component } from 'react'
import ModalPokemon from './modalPokemon'


class pokemonCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalShow: false,
            afterOpenModal: false,
            closeModal: false,
            dataCard: []
        }
    }

    onOpenModal() {
        this.setState({ isModalShow: true })
    }

    render() {
        return (
            <div >
                <h1 style={{ textAlign: 'center' }}>My Pokedex</h1>
                <div className="container row" style={{ overflow: 'auto', height: '600px', paddingTop: '20px' }}>
                    {
                        this.state.dataCard ?
                            this.state.dataCard.map((e, i) => {
                                return <div className="col-sm-6" key={i}>
                                    <div className="card">
                                        <div className="card-body" style={{ display: 'flex' }}>
                                            <div className="col-sm-4">
                                                <img
                                                    width={90}
                                                    src={`${e.img}`}
                                                    alt="user"
                                                    className="rounded-circle"
                                                />
                                            </div>
                                            <div className="col-sm-8">
                                                <h5 className="card-title">{e.name}</h5>
                                                <div className="row">
                                                    <label> HP :</label>
                                                    <div className="progress" style={{ width: '40%', marginLeft: '45px', marginTop: '5px' }}>
                                                        <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                            aria-valuemin="0" aria-valuemax="100" style={{ width: `${e.hp}%` }}>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label>STR :</label>
                                                    <div className="progress" style={{ width: '40%', marginLeft: '38px', marginTop: '5px' }}>
                                                        <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                            aria-valuemin="0" aria-valuemax="100" style={{ width: `${e.strength}%` }}>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label>WEAK :</label>
                                                    <div className="progress" style={{ width: '40%', marginLeft: '20px', marginTop: '5px' }}>
                                                        <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                            aria-valuemin="0" aria-valuemax="100" style={{ width: `${e.hp}%` }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                            : null
                    }
                    <ModalPokemon className="modal"
                        isOpen={this.state.isModalShow}
                        onAfterOpen={this.state.afterOpenModal}
                        onRequestClose={this.state.closeModal}
                        closeModal={(data) => {
                            console.log(data)
                            this.setState({ isModalShow: data.close, dataCard: data.dataCard })
                        }} />
                </div>
                <footer className="footerCard"><button className="btn buttomPuls" onClick={() => this.onOpenModal()}><i className="fa fa-plus"></i></button></footer>

            </div>
        )
    }
}


export default pokemonCard
