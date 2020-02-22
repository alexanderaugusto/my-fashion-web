import React, { Component } from "react"
import {
  Card,
  CardBody,
  Form
} from "reactstrap"
import { CardDropdown, InputAddon, Button } from "../../components"
import { inputValidation } from "../../constants"

import image from "../../assets/img/default-avatar.png"

export default class PersonalData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      personalData: {
        id: "",
        name: "",
        cpf: "",
        dateOfBirth: "",
        phone: "",
        image,
        nameState: "default",
        cpfState: "default",
        dateOfBirthState: "default",
        phoneState: "default",
      },
    }
  }

  componentDidMount() {
    const { data } = this.props
    const { personalData } = this.state

    if (data.id !== personalData.id) {
      this.getPersonalData()
    }
  }

  componentDidUpdate() {
    const { data } = this.props
    const { personalData } = this.state

    if (data.id !== personalData.id) {
      this.getPersonalData()
    }
  }

  getPersonalData() {
    let personalData = this.state.personalData
    const { id, name, cpf, dateOfBirth, phone, image } = this.props.data

    personalData.id = id
    if (name && name !== "") {
      personalData.name = name
      personalData.nameState = "has-success"
    }
    if (cpf && cpf !== "") {
      personalData.cpf = cpf
      personalData.cpfState = "has-success"
    }
    if (dateOfBirth && dateOfBirth !== "") {
      personalData.dateOfBirth = dateOfBirth
      personalData.dateOfBirthState = "has-success"
    }
    if (phone && phone !== "") {
      personalData.phone = phone
      personalData.phoneState = "has-success"
    }
    if (image && image !== "") {
      personalData.image = image
    }

    this.setState({ personalData })
  }

  addImage(e) {
    let reader = new FileReader()
    let file = e.target.files[0]

    if (file !== undefined) {
      let personalData = this.state.personalData

      reader.onloadend = () => {
        personalData.image = reader.result
        this.setState({ personalData })
        this.props.uploadImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  checkData(e, state) {
    e.preventDefault()

    const { personalData } = this.state

    if (personalData[state] === "has-success")
      this.edit()
    else
      console.log("Dados inválidos")
  }

  edit() {
    const { name, cpf, dateOfBirth: date_of_birth, phone } = this.state.personalData
    const data = { name, cpf, date_of_birth, phone }

    this.props.onSubmit(data, () => this.refs["card-dropdown"].closeCollapse())
  }

  render() {
    const { personalData } = this.state

    return (
      <Card className="card" style={{ marginTop: 30 }}>
        <div className="picture profile-image" onClick={(e) => this.refs["input-file"].click(e)}>
          <img
            src={personalData.image}
            className="picture-src"
            alt="..."
            width="170"
            height="170"
            loading="lazy"
          />
          <input ref="input-file" style={{ display: "none" }} type="file" accept="image/*" onChange={e => this.addImage(e)} />
        </div>
        <CardBody>
          <CardDropdown
            plain
            ref="card-dropdown"
            components={[
              {
                title: "Nome",
                subtitle: personalData.name !== "" ? personalData.name : "Digite um nome aqui",
                component: (
                  <Form onSubmit={(e) => this.checkData(e, "nameState")}>
                    <InputAddon type="text" value={personalData.name} placeholder="Digite um nome..." className="form-control-lg"
                      inputState={personalData.nameState}
                      onChange={(e) => this.setState({ personalData: inputValidation.nameValidation(e, personalData) })} />
                    <Button
                      block
                      round
                      color="info"
                      className="mb-3"
                    >
                      Salvar
                    </Button>
                  </Form>
                )
              },
              {
                title: "CPF",
                subtitle: personalData.cpf !== "" ? personalData.cpf : "Digite um CPF aqui",
                component: (
                  <Form onSubmit={(e) => this.checkData(e, "cpfState")}>
                    <InputAddon maxLength="14" type="text" value={personalData.cpf} placeholder="Digite um cpf..." className="form-control-lg"
                      inputState={personalData.cpfState}
                      onChange={(e) => this.setState({ personalData: inputValidation.cpfValidation(e, personalData) })} />
                    <Button
                      block
                      round
                      color="info"
                      className="mb-3"
                    >
                      Salvar
                    </Button>
                  </Form>
                )
              },
              {
                title: "Data de nascimento",
                subtitle: personalData.dateOfBirth !== "" ? personalData.dateOfBirth : "Digite seu nascimento aqui",
                component: (
                  <Form onSubmit={(e) => this.checkData(e, "dateOfBirthState")}>
                    <InputAddon maxLength="10" type="text" value={personalData.dateOfBirth} placeholder="Digite seu nascimento..." className="form-control-lg"
                      inputState={personalData.dateOfBirthState}
                      onChange={(e) => this.setState({ personalData: inputValidation.dateOfBirthValidation(e, personalData) })} />
                    <Button
                      block
                      round
                      color="info"
                      className="mb-3"
                    >
                      Salvar
                    </Button>
                  </Form>
                )
              },
              {
                title: "Telefone",
                subtitle: personalData.phone !== "" ? personalData.phone : "Digite um celular aqui",
                component: (
                  <Form onSubmit={(e) => this.checkData(e, "phoneState")}>
                    <InputAddon maxLength="14" type="text" value={personalData.phone} placeholder="Digite um celular..." className="form-control-lg"
                      inputState={personalData.phoneState}
                      onChange={(e) => this.setState({ personalData: inputValidation.phoneValidation(e, personalData) })} />
                    <Button
                      block
                      round
                      color="info"
                      className="mb-3"
                    >
                      Salvar
                    </Button>
                  </Form>
                )
              },
            ]}
          />
        </CardBody>
      </Card>
    )
  }
}