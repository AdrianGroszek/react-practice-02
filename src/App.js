import { useState } from 'react';

export default function App() {
	const [item, setItem] = useState('');
	const [itemNum, setItemNum] = useState('');
	const [itemsList, setItemsList] = useState([]);

	function handleAddItem(e) {
		e.preventDefault();

		if (!item) return;

		setItemsList((itemsList) => [
			...itemsList,
			{ id: Date.now(), item, itemNum, isBuyed: false },
		]);

		setItem('');
		setItemNum('');
	}

	function handleDeleteItem(id) {
		setItemsList((itemsList) => itemsList.filter((item) => item.id !== id));
	}

	function handleToggle(id) {
		setItemsList((items) =>
			items.map((item) =>
				item.id === id ? { ...item, isBuyed: !item.isBuyed } : item
			)
		);
	}

	return (
		<>
			<Header />
			<Form
				item={item}
				setItem={setItem}
				itemNum={itemNum}
				setItemNum={setItemNum}
				onAddItem={handleAddItem}
			/>
			{itemsList.length === 0 ? (
				<h2 className='header'>You have no products on your list</h2>
			) : (
				<ListItem
					itemsList={itemsList}
					onDelete={handleDeleteItem}
					onToggle={handleToggle}
				/>
			)}
		</>
	);
}

function Header() {
	return <h1 className='header'>Shopping list</h1>;
}

function Form({ item, setItem, itemNum, setItemNum, onAddItem }) {
	return (
		<form className='form-add-item' onSubmit={onAddItem}>
			<select value={itemNum} onChange={(e) => setItemNum(e.target.value)}>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type='text'
				placeholder='Product...'
				className='item-input'
				value={item}
				onChange={(e) => setItem(e.target.value)}
			/>
			<button className='btn btn-add'>Add</button>
		</form>
	);
}

function Item({ item, onDelete, onToggle }) {
	return (
		<li className='item'>
			<label>
				<input
					type='checkbox'
					checked={item.isBuyed}
					onChange={() => onToggle(item.id)}
				/>
				<span style={item.isBuyed ? { textDecoration: 'line-through' } : {}}>
					{item.itemNum} {item.item}
				</span>
			</label>
			<button className='btn' onClick={() => onDelete(item.id)}>
				❌
			</button>
		</li>
	);
}

function ListItem({ itemsList, onDelete, onToggle }) {
	return (
		<ul className='item-list'>
			{itemsList.map((item) => (
				<Item
					item={item}
					onDelete={onDelete}
					key={item.id}
					onToggle={onToggle}
				/>
			))}
		</ul>
	);
}
