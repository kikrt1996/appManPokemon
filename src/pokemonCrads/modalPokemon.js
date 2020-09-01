import React, { Component } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
  padding: 20px;
`
const Section = styled.div`
  height: 500px;
  overflow: auto;
`

const Header = styled.div`
  text-align: justify;
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 50px;
  // margin-bottom: 40px;
`

class ModalPokemon extends Component {
    static propTypes = {}
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            dataCard: [],
        }
    }
    componentDidMount() {
        this.onGetdataPokrmon()
    }

    async onGetdataPokrmon(text) {
        let textSerach = text ? text : ''
        let temp = await axios.get(`http://localhost:3030/api/cards?limit=30&name=${textSerach}`)
        let tempData = []
        if (temp.data.cards.length > 0) {
            temp.data.cards.forEach(e => {
                let { hpPokemon, damage, happiness } = 0
                let { strength, weakness } = ''
                if (e.hp * 1 > 100) hpPokemon = 100
                else hpPokemon = e.hp
                if (e.attacks) {
                    if (e.attacks.length > 1) {
                        strength = 100
                    } else {
                        strength = 50
                    }
                }
                if (e.weaknesses) {
                    if (e.weaknesses.length > 1) {
                        weakness = 100
                    } else {
                        weakness = 50
                    }
                }
                if (e.attacks) {
                    let tempsum = 0
                    e.attacks.forEach(el => {
                        tempsum = el.damage.substring(0, el.damage.length - 1)
                        damage = damage * 1 + tempsum * 1
                    })

                }
                happiness = ((hpPokemon * 1 / 10) + (damage * 1 / 10) + 10 - (weakness * 1)) / 5
                tempData.push({
                    hp: hpPokemon,
                    strength: strength,
                    weakness: weakness,
                    damage: damage,
                    happiness: happiness,
                    img: e.imageUrl,
                    name: e.name
                })
                this.setState({ dataList: tempData })
            });
        }

    }

    onAddDataCard(e, i) {
        let arr = this.state.dataCard
        let arr1 = []
        arr.push(e)
        arr1 = this.state.dataList.filter(e => !arr.includes(e))
        this.setState({ dataCard: arr, dataList: arr1 })
    }
    onCloseModal() {
        this.props.closeModal({ dataCard: this.state.dataCard, close: false })
    }

    render() {
        const { isOpen } = this.props
        const { dataList } = this.state.dataList
        return (
            <Modal isOpen={isOpen} ariaHideApp={false} style={{ width: '400px' }} >
                <Container  >
                    <Header>
                        <button className="btn" style={{ float: 'right', marginBottom: '5px' }} onClick={() => this.onCloseModal()}><i className="fa fa-times"></i></button>
                        <div style={{ width: '100%' }}>
                            <input type="text" style={{ width: '100%' }} onChange={(e) => this.onGetdataPokrmon(e.target.value)} />
                        </div>
                    </Header>
                    <Section>
                        <div className="container row" style={{ overflow: 'auto', height: '500px', paddingTop: '10px' }}>
                            {
                                this.state.dataList ?
                                    this.state.dataList.map((e, i) => {
                                        return <div className="col-sm-12" key={i}>
                                            <div className="card">
                                                <div className="card-body" style={{ display: 'flex' }}>
                                                    <div className="col-sm-2">
                                                        <img
                                                            width={100}
                                                            src={`${e.img}`}
                                                            alt="user"
                                                            className="rounded-circle"
                                                        />
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <span style={{ position: 'absolute', cursor: 'pointer', right: 0 }} onClick={() => { this.onAddDataCard(e, i) }}>add</span>
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

                        </div>
                    </Section>
                </Container>
            </Modal>
        )
    }
}

export default ModalPokemon
