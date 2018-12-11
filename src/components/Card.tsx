import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Pokedex } from './Pokedex';

interface ComponentProps {
    name: string;
    url?: string;
    addComparison: (name: string) => void;
}

interface ComponentState {
    pokemon: any;
}

export class Card extends React.Component<ComponentProps, ComponentState> {
    componentDidMount() {
        Pokedex.getPokemonByName(this.props.name).then((resp: any) => this.setState({ pokemon: resp}));
    }

    addComparison = () => {
        this.props.addComparison(this.props.name);
    }

    render() {
        return this.state ?
        <div className='card'>
            <div className='card-img'>
                <img src={this.state.pokemon.sprites.front_default}/>
            </div>
            <div className='card-desc'>
                <h3>{this.props.name}</h3>
                <ul>
                    <li>
                        weight: {this.state.pokemon.weight}
                    </li>
                    <li>
                        height: {this.state.pokemon.height}
                    </li>
                    <li>
                        {this.state.pokemon.types.map((item: any) => item.type.name).join(' ')}
                    </li>
                </ul>
            </div>
            <div className='card-compare-btn' title='Добавить к сравнению'>
                <a className='icon' onClick={this.addComparison}><FontAwesomeIcon icon={faPlus}/></a>
            </div>
        </div> :
        null;
    }
}
