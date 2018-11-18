import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import logo from './logo.svg';

class UserTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		fetch('https://uinames.com/api/?ext&amount=100')
			.then((response) => {
				return response.json();
			})
			.then((json_response) => {
				this.setState({data: json_response});
			});
	}

	render() {
		const {data} = this.state;

		// first/last name, gender, region, phone, email, password and personal photo
		// If we want to display other data, we can just add columns to this table
		const columns = [{
			// I put the photo first because I thought it would be best to see the user first
			Header: 'Photo',
			Cell: (row) => {
				return <div><img height={75} src={row.original.photo} alt={logo}/></div>;
			},
			minWidth: 75,
			Filter: ({filter}) =>
				<span></span> // Removes the filter box from photo column
		}, {
			Header: 'First Name',
			accessor: 'name',
			minWidth: 75,
		}, {
			Header: 'Last Name',
			accessor: 'surname',
			minWidth: 75
		}, {
			Header: 'Gender',
			accessor: 'gender',
			minWidth: 50,
			// Right now it's just male/female, but more gender options can be added
			filterMethod: (filter, row) => {
				if (filter.value === "all") {
					return true;
				}
				if (filter.value === "male") {
					return row[filter.id] === "male";
				}
					return row[filter.id] === "female";
				},
			Filter: ({ filter, onChange }) =>
				<select
					onChange={event => onChange(event.target.value)}
					style={{ width: "100%" }}
					value={filter ? filter.value : "all"}
				>
					<option value="all">Show All</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
		}, {
			// Right now I have region as a String search, but this could be changed to a dropdown
			// with a continent -> country tree
			Header: 'Region',
			accessor: 'region',
			minWidth: 50
		}, {
			Header: 'Phone',
			Cell: (row) => {
				// This is just to format the phone numbers
				var formatted_phone = row.original.phone.replace(/([0-9]) /g,'$1-');
				return <span>{formatted_phone}</span>
			},
			accessor: 'phone',
			minWidth: 50
		}, {
			Header: 'Email',
			Cell: (row) => {
				// I noticed that some emails had spaces, so I'm just removing them
				var clean_email = row.original.email.replace(/ /g,'');
				return <span>{clean_email}</span>
			}
		}, {
			// This is currently displaying the raw password, which isn't safe
			// Depending on how much we trust the internal users, this could be hidden and unlockable by admin
			Header: 'Password',
			accessor: 'password',
			minWidth: 50
		}];

		return (<ReactTable
			data={data}
			filterable
            defaultFilterMethod={(filter, row) =>
				row[filter.id].includes(filter.value)}
			columns={columns}
			defaultPageSize={10}
			className="-striped -highlight"
		/>);
	}
}

export default UserTable;
