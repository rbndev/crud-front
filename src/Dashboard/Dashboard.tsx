import React, {useEffect} from 'react'
import axios from 'axios'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import TableUsers from './TableUsers'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ModalDash from '../component/Modal'

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      borderRadius: '20px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    inputCad: { heigth: '10px !important' },
    btnCad: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    root: {
        flexGrow: 1,
        '& > span': { margin: theme.spacing(2) },
    },
    paperr: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        position: 'relative'
    },
    container: { margin: 'auto'},
    button: { margin: theme.spacing(1) },
  }),
)

const Dashboard: React.FC = () => {
    const styles = useStyles()
    const [inputAddCargo, setInputAddCargo] = React.useState<string>('')
    const [listUsers, setListUsers] = React.useState<[]>([])
    const [listCargos, setListCargos] = React.useState([])

    const listagemCargo = () => {
        axios.get('http://localhost:4000/listcargos')
        .then(res => {
            setListCargos(res.data)
        })
    }
    
    const listagemUsers = () => {
        axios.get('http://localhost:4000/listusers')
        .then(res => {
            setListUsers(res.data)
        })
    }

    useEffect(() => {
        listagemCargo()
        listagemUsers()
    }, [])
    

    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle)
    const [open, setOpen] = React.useState(false)
    const [addCargo, setAddCargo] = React.useState(false)

    
    // State do form
    const [nome, setNome] = React.useState('')
    const [sobreNome, setSobreNome] = React.useState('')
    const [salario, setSalario] = React.useState('')
    const [dataNascimento, setDataNascimento] = React.useState('')
    const [cargo, setCargo] = React.useState('')

    // Funções para abrir/fechar Modais (ADD USER's & ADD CARGO)
    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)} 
    const openAddCargo = () => {setAddCargo(true)}
    const closedAddCargo = () => {setAddCargo(false)}
    
    // Funções para setar estados para os input's
    const updateNome = (e: React.ChangeEvent<{ value: unknown }>) => {setNome(e.target.value as string)}
    const updateSobreNome = (e: React.ChangeEvent<{ value: unknown }>) => {setSobreNome(e.target.value as string)}
    const updateSalario = (e: React.ChangeEvent<{ value: unknown }>) => {setSalario(e.target.value as string)}
    const updateDataNascimento = (e: React.ChangeEvent<{ value: unknown }>) => {setDataNascimento(e.target.value as string)}
    const updateCargo = (event: React.ChangeEvent<{ value: unknown }>) => {setCargo(event.target.value as string)}
    // onChange input addCargo
    const updateInputAddCargo = (event: React.ChangeEvent<HTMLInputElement>) => {setInputAddCargo(event.currentTarget.value)}


    const addNewCargo = () => {
        axios.post('http://localhost:4000/addcargo', {
            cargo: inputAddCargo,
        }).then((res) => {
            listagemCargo()
            closedAddCargo()
        })
    }

    const addNewUser = () => {
        axios.post('http://localhost:4000/cadastro', {
            nome: nome,
            sobrenome: sobreNome,
            salario: salario,
            datanascimento: dataNascimento,
            cargo: cargo,
        }).then((res) => {
            listagemUsers()
            handleClose()
        })
    }

    const bodycargo = (
        <div style={modalStyle} className={styles.paper}>
            <h2 id="simple-modal-title">ADD CARGO</h2>
            <Grid container xs={12} spacing={2}>
                <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                    <TextField 
                        label="CARGO"
                        variant="outlined"
                        onChange={updateInputAddCargo}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>

                <div className={styles.btnCad}>
                    <Button
                        variant="contained"
                        onClick={closedAddCargo}
                        color="secondary"
                        className={styles.button}
                        startIcon={<CloseIcon/>}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addNewCargo}
                        className={styles.button}
                        startIcon={<AddIcon/>}
                    
                    >
                        Adicionar
                    </Button>
                </div>
            </Grid>
        </div>
    )

    const body = (
        <div style={modalStyle} className={styles.paper}>
            <h2 id="simple-modal-title">CADASTRO USER'S</h2>
            <Button
                variant="contained"
                style={{position: 'absolute', right: 40, top: 25}}
                onClick={openAddCargo}
                color="secondary"
                className={styles.button}
                startIcon={<AddIcon/>}
            >
                ADD CARGO
            </Button>
            <Modal
                open={addCargo}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                { bodycargo }
            </Modal>
            <Grid container xs={12} spacing={2}>
                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                    <TextField 
                        label="NOME"
                        onChange={updateNome}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                    <TextField 
                        id="outlined-basic"
                        className={styles.inputCad}
                        onChange={updateSobreNome}
                        label="SOBRENOME" 
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                    <TextField 
                        label="SALÁRIO"
                        type="number"
                        onChange={updateSalario}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                    <TextField 
                        label="DATA DE NASCIMENTO"
                        onChange={updateDataNascimento}
                        placeholder="Ex: 09/04/1997"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="outlined-basic"
                        placeholder="Selecione o cargo"
                        onChange={updateCargo}
                        variant="outlined"
                        defaultValue=""
                        fullWidth
                    >   
                        { 
                            listCargos.map((element: any, key: number) => {
                                return (
                                    <MenuItem value={element.cargo} key={element.cargo}>
                                        { element.cargo }
                                    </MenuItem>
                                )
                            }) 
                        }
                    </Select>
                </Grid>
                <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                    <div className={styles.btnCad}>
                        <Button
                            variant="contained"
                            onClick={handleClose}
                            color="secondary"
                            className={styles.button}
                            startIcon={<CloseIcon/>}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addNewUser}
                            className={styles.button}
                            startIcon={<AddIcon/>}
                        >
                            Adicionar
                        </Button>
                    </div>
                </Grid>
            </Grid>
            
        </div>
    )

    return (
        <Grid container className={styles.container} sm={11} spacing={1} xs={11} md={11} lg={6} >
            <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                <Paper  className={styles.paperr} style={{fontWeight: 'bold'}}>
                    CADASTRO USUÁRIOS
                    <Button
                        variant="contained"
                        onClick={handleOpen}
                        style={{float: 'right', marginTop: -7}}
                        color="primary"
                        className={styles.button}
                        startIcon={<AddIcon/>}
                    >
                        Adicionar
                    </Button>
                    <ModalDash body={body} open={open} handleClose={handleClose} />
                </Paper>
            </Grid>
            <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                <TableUsers 
                    listUsers={listUsers} 
                    listagemUsers={listagemUsers} 
                    listCargos={listCargos} 
                />
            </Grid>
        </Grid>
    )
}

export default Dashboard