import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Pokedex } from './Pokedex';

interface ComponentProps {
    name: string;
    remove: (name: string) => void;
}

interface ComponentState {
    pokemon: any;
}

export class ComparisonCard extends React.Component<ComponentProps, ComponentState> {

    componentDidMount() {
        Pokedex.getPokemonByName(this.props.name).then((resp: any) => this.setState({ pokemon: resp}));
    }

    remove = () => {
        this.props.remove(this.props.name);
    }

    render() {
        return this.state ?
            (
                <div className='compare-card'>
                    <div className='compare-card-img'>
                        <img src={this.state.pokemon.sprites.front_default} />
                    </div>
                    <div className='compare-card-desc'>
                        <h3>{this.props.name}</h3>
                        <div>
                            <h4>weight</h4>
                        </div>
                        <div className='compare-card-desc-value'>
                            {this.state.pokemon.weight}
                        </div>
                        <div>
                            <h4>height</h4>
                        </div>
                        <div className='compare-card-desc-value'>
                            {this.state.pokemon.height}
                        </div>
                        <div>
                            <h4>base experience</h4>
                        </div>
                        <div className='compare-card-desc-value'>
                            {this.state.pokemon.base_experience}
                        </div>
                        <div>
                            <h4>abilities</h4>
                        </div>
                        <div className='compare-card-desc-value' style={{height: '2.4em'}}>
                            {this.state.pokemon.abilities.map((item: any) => item.ability.name).join(', ')}
                        </div>
                        <div>
                            <h4>types</h4>
                        </div>
                        <div className='compare-card-desc-value'>
                            {this.state.pokemon.types.map((item: any) => item.type.name).join(', ')}
                        </div>
                        <div>
                            <h4>game indices</h4>
                        </div>
                        <div className='compare-card-desc-value'>
                            {this.state.pokemon.game_indices.map((item: any) => item.version.name).join(', ')}
                        </div>
                    </div>
                    <div className='compare-card-remove-btn'>
                        <a title='Убрать из сравнения' className='icon' onClick={this.remove}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </a>
                    </div>
                </div>
            ) : null;
    }
}
