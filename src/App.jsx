import { useState } from 'react'
import './App.css'

function App() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    // Mudamos para armazenar o array de usuários cadastrados
    const [resultado, setResultado] = useState([])

    const onSubmit = (e) => {
        e.preventDefault();

        const emailFormatado = email.trim().toLowerCase();

        // Usando o 'setResultado' correto que você declarou acima
        setResultado((listaAtual) => {
            const existe = listaAtual.some(u => u.email?.trim().toLowerCase() === emailFormatado);

            if (existe) {
                alert('Este e-mail já está cadastrado!');
                return listaAtual; 
            }

            const novoUsuario = {
                id: Date.now(),
                name: name.trim(),
                email: email.trim(),
                age: age
            };

            // Limpa os campos após o cadastro com sucesso
            setName('');
            setEmail('');
            setAge('');

            return [...listaAtual, novoUsuario];
        });
    };


  

    
    
    

            
        

    return (
        <>
            <footer>
                <p>&copy; 2026 Arthur. Todos os direitos reservados.</p>
            </footer>
            <h1>Cadastro de Usuários</h1>
            <form onSubmit={onSubmit} className='hi'>
                    <div className='oi'>
                    <input
                        type="text"
                        id='name'
                        placeholder='digite seu nome aqui'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='oi'>
                    <input
                        type="email"
                        id='email'
                        placeholder='digite seu email aqui'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='oi'>
                    <input
                        type="number"
                        id='age'
                        placeholder='digite sua idade aqui'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>

                <div className='but'>
                    <button type='submit'>Cadastrar</button>
                </div>
                 </form>
                <ol>
                    {resultado.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.email} - {item.age}
                        </li>
                    ))}
                </ol>

            
                
           
        </>
    )
}
export default App