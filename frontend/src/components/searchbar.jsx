import './searchbar.css'
import { useRef } from 'react';
import { FaSearch } from 'react-icons/fa'


function SearchBar(props) {

  console.log(props)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // props.setSearchTerm(props.searchTerm.replace(/[^\w\s]/gi,""))
    
  }

  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input name='search' type="text" className='form-control' placeholder='The Lost World ...' onChange={(e) => props.setSearchTerm(e.target.value)} />
                <button type="submit" className='flex flex-c' onClick={handleSubmit}>
                  <FaSearch className='text-purple' size={32} />
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;