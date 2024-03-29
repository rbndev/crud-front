import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ModalDash from '../component/Modal'

function getModalStyle() {
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
        inputCad: {
            heigth: '10px !important',
        },
        btnCad: {
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },table: {
            minWidth: 650,
    },
}))
  
function createData(
    id: number, 
    nome: string, 
    sobrenome: string, 
    cargo: string, 
    datanasc: string, 
    salario: number) {
        return { id, nome, sobrenome, cargo, datanasc, salario }
}

interface PropsTabela {
    listUsers: [],
    listagemUsers: () => void,
    listCargos: any
}

const Tabela: React.FC<PropsTabela> = (props) => {
    const styles = useStyles()
    const { listUsers, listagemUsers, listCargos } = props
    const [modalStyle] = React.useState(getModalStyle)
    const [currentUserEdit, setCurrentUserEdit] = React.useState<any>()
    const [open, setOpen] = React.useState(false)
    const rows: {
        id: number 
        nome: string 
        sobrenome: string 
        cargo: string 
        datanasc: string 
        salario: number
    }[] = []

    // Função para abrir/fechar modal Add Users
    const handleOpen = (id: number) => {
        const currentUser:any = listUsers.filter((item: any) => item.id === id)
        setCurrentUserEdit(currentUser[0])      
        setOpen(true)
    } 
    const handleClose = () => {setOpen(false)}
    
    // Funções de manipulação
    const editUser = () => {
        axios.post('http://localhost:4000/edit', {
            ...currentUserEdit
        }).then((response) => {
            listagemUsers()
            handleClose()
        })
    }

    const deleteUser = (id: number) => {
        axios.post('http://localhost:4000/delete', {
            id: id,
        }).then((response) => {
            listagemUsers()
        })
    }

    // Loop na lista de usuários
    listUsers.map((element: any, key: number) => {
        return (
            rows.push(
                createData( 
                    element.id, 
                    element.nome, 
                    element.sobrenome, 
                    element.cargo, 
                    element.data_nascimento, 
                    element.salario
                )
            )
            
        )
    })

    // Renderização do modal Editar User's
    const body = (
        <div style={modalStyle} className={styles.paper}>
            <h2 id="simple-modal-title">EDIT USER'S</h2>
            <Grid container xs={12} spacing={2}>
                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                    <TextField 
                        label="NOME"
                        defaultValue={currentUserEdit?.nome}
                        variant="outlined"
                        onChange={(e) => setCurrentUserEdit((prev: any) => ({
                            ...prev,
                            nome: e.target.value
                        }))}
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
                        label="SOBRENOME" 
                        defaultValue={currentUserEdit?.sobrenome}
                        variant="outlined"
                        onChange={(e) => setCurrentUserEdit((prev: any) => ({
                            ...prev,
                            sobrenome: e.target.value
                        }))}
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
                        defaultValue={currentUserEdit?.salario}
                        variant="outlined"
                        onChange={(e) => setCurrentUserEdit((prev: any) => ({
                            ...prev,
                            salario: e.target.value
                        }))}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                    <TextField 
                        label="DATA DE NASCIMENTO"
                        placeholder="Ex: 09/04/1997"
                        defaultValue={currentUserEdit?.data_nascimento}
                        variant="outlined"
                        onChange={(e) => setCurrentUserEdit((prev: any) => ({
                            ...prev,
                            data_nascimento: e.target.value
                        }))}
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
                        defaultValue={currentUserEdit?.cargo}
                        onChange={(e) => setCurrentUserEdit((prev: any) => ({
                            ...prev,
                            cargo: e.target.value
                        }))}
                        variant="outlined"
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
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Button
                            variant="contained"
                            onClick={handleClose}
                            color="secondary"
                            startIcon={<CloseIcon/>}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{marginLeft: 5}}
                            onClick={editUser}
                            startIcon={<CheckTwoToneIcon/>}
                        >
                            EDITAR
                        </Button>
                    </div>
                </Grid>
            </Grid>
            
        </div>
    )

    
    return (
        <TableContainer component={Paper}>
            <Table className={styles.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>NOME</TableCell>
                    <TableCell>SOBRENOME</TableCell>
                    <TableCell>CARGO</TableCell>
                    <TableCell>DATA DE NASCIMENTO</TableCell>
                    <TableCell>SALÁRIO</TableCell>
                    <TableCell>AÇÕES</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {
                    rows.map((row) => (
                        <TableRow key={row.nome}>
                            <TableCell component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            <TableCell>{row.sobrenome}</TableCell>
                            <TableCell>{row.cargo}</TableCell>
                            <TableCell>{row.datanasc}</TableCell>
                            <TableCell>{row.salario.toLocaleString('pt-br', {style: 'currency', currency: 'BRL',})}</TableCell>
                            <TableCell>
                                <IconButton aria-label="edit" onClick={(event) => {
                                    event.preventDefault()
                                    return handleOpen(row.id)
                                }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={(event) => {
                                    event.preventDefault()
                                    return deleteUser(row.id)
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))
                }
                </TableBody>
            </Table>

            <ModalDash body={body} open={open} handleClose={handleClose} />
        </TableContainer>
    )
}

export default Tabela