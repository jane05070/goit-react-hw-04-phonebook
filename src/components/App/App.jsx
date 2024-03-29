import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ContactList from '../ContactList';
import Filter from '../Filter';
import ContactForm from '../ContactForm';


const App = () => {
   const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const key = 'contacts';

   useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem(key));

    parsedContacts && setContacts( parsedContacts );
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = task => {
    const searchSameName = contacts
      .map(cont => cont.name)
      .includes(task.name);

    if (searchSameName) {
      alert(`${task.name} is already in contacts`);
    } else if (task.name.length === 0) {
      alert('Fields must be filled!');
    } else {
      const contact = {
        ...task,
        id: uuidv4(),
      };

      setContacts(prevContacts => 
       [...prevContacts, contact]);
    }
  };

  const changeFilter = e => {
    e.preventDefault();

    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
      return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

   const removeContact = contactId => {
    setContacts(prevContacts => 
        prevContacts.filter(({ id }) => id !== contactId)
    );
  };
  
  const visibleContacts = getVisibleContacts();
  const isVisibleFilter = contacts.length > 1;

  return (
      <div>
        <h1>Phonebook</h1>

        <ContactForm onAddContact={addContact} />
        <h2>Contacts</h2>
        {isVisibleFilter && (
          <Filter value={filter} onChangeFilter={changeFilter} />
        )}
        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={removeContact}
          />
        )}
      </div>
    );
  
}
 
export default App;
// export default class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };
//   #key = 'contacts';

//   componentDidMount() {
//     const parsedContacts = JSON.parse(localStorage.getItem(this.#key));

//     parsedContacts && this.setState({ contacts: parsedContacts });
//   }

//   componentDidUpdate(prevState) {
//     this.state.contacts !== prevState.contacts &&
//       localStorage.setItem(this.#key, JSON.stringify(this.state.contacts));
//   }

  
//   addContact = task => {
//     const searchSameName = this.state.contacts
//       .map(cont => cont.name)
//       .includes(task.name);

//     if (searchSameName) {
//       alert(`${task.name} is already in contacts`);
//     } else if (task.name.length === 0) {
//       alert('Fields must be filled!');
//     } else {
//       const contact = {
//         ...task,
//         id: uuidv4(),
//       };

//       this.setState(prevState => ({
//         contacts: [...prevState.contacts, contact],
//       }));
//     }
//   };

//   changeFilter = e => {
//     e.preventDefault();

//     this.setState({ filter: e.target.value });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;

//     return contacts.filter(contacts =>
//       contacts.name.toLowerCase().includes(filter.toLowerCase()),
//     );
//   };

//   removeContact = contactId => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//       };
//     });
//   };

//   render() {
//     const { filter } = this.state;

//     const visibleContacts = this.getVisibleContacts();
//     const isVisibleFilter = this.state.contacts.length > 1;

//     return (
//       <div>
//         <h1>Phonebook</h1>

//         <ContactForm onAddContact={this.addContact} />
//         <h2>Contacts</h2>
//         {isVisibleFilter && (
//           <Filter value={filter} onChangeFilter={this.changeFilter} />
//         )}
//         {visibleContacts.length > 0 && (
//           <ContactList
//             contacts={visibleContacts}
//             onRemoveContact={this.removeContact}
//           />
//         )}
//       </div>
//     );
//   }
// }
