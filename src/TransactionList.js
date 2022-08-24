import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class TransactionList extends Component {

    constructor(props) {
        super(props);
        this.state = {transactions: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/rewards/points')
            .then(response => response.json())
            .then(data => this.setState({transactions: data}));
    }

    async remove(id) {
        await fetch(`/rewards/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTransactions = [...this.state.transactions].filter(i => i.id !== id);
            this.setState({transactions: updatedTransactions});
        });
    }

    render() {
        const {transactions, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const transactionList = transactions.map(transactions => {
            return <tr key={transactions.id}>
                <td style={{whiteSpace: 'nowrap'}}>{transactions.itemName}</td>
                <td>{transactions.dateOfTransaction}</td>
                <td>{transactions.amountOfTransaction}</td>
                <td>{transactions.amountOfRewards}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.remove(transactions.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Transactions</h3>
                    <Table width="100%">
                        <thead>
                        <tr>
                            <th width="20%">Item Name</th>
                            <th width="20%">Date of Transaction</th>
                            <th width="20%">Amount of Transaction</th>
                            <th width="20%">Amount of Rewards</th>
                            <th width="20%">Actions</th>
                            <Button color="link"><Link to="/add" color="white">Add</Link></Button>
                        </tr>
                    
                        </thead>
                        <tbody>
                        {transactionList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
    
}
export default TransactionList;
