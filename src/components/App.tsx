import * as React from 'react';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';
import { ApplicationState } from '../store';
import { fetchRequest, fetchSuccess } from '../store/list/actions';
import { ListState } from '../store/list/types';
import { Card } from './Card';
import { ComparisonCard } from './ComparisonCard';
import { Paginator, PaginatorConfig } from './Paginator';
import { Pokedex } from './Pokedex';


type ComponentProps = ListState & {
    fetchList: () => void;
};

interface ComponentState {
    comparedPokemons: any[];
    curentPage: number;
    itemsPage: any[];
    itemsPerPage: number;
}

class App extends React.Component<ComponentProps, ComponentState> {

    state = {
        comparedPokemons: [],
        curentPage: 1,
        itemsPage: [],
        itemsPerPage: 5,
    };
    componentDidMount() {
        this.props.fetchList();
    }

    render() {
        const handlePaginator = (paginatonConfig: PaginatorConfig) => {
            this.setState({
                curentPage: paginatonConfig.curentPage,
                itemsPage: paginatonConfig.itemsPage,
                itemsPerPage: paginatonConfig.itemsPerPage,
            });
        };
        const addCompare = (namePokemon: string) => {
            if (!this.state.comparedPokemons.find((item) => item === namePokemon)) {
                this.setState({comparedPokemons: [...this.state.comparedPokemons, namePokemon]});
            }
        };
        const removeCompare = (namePokemon: string) => {
            this.setState({comparedPokemons: this.state.comparedPokemons.filter((item) =>
                item !== namePokemon)});
        };
        return this.props.loaded ? (
            <div className='pokedex'>
                <div className='pokedex-pokemons'>
                    <div className='pokedex-pokemons-cards'>
                        {this.state.itemsPage.map((item: any) =>
                            <Card key={uuid()} name={item.name} addComparison={addCompare}/>,
                        )}
                    </div>
                    <div className='pokedex-pokemons-paginator'>
                        <Paginator
                            listItemsForPaging={this.props.data.results}
                            paginatorConfig={{
                                curentPage: this.state.curentPage,
                                itemsPage: this.state.itemsPage,
                                itemsPerPage: this.state.itemsPerPage,
                            }}
                            handlePaginator={handlePaginator.bind(this)}
                        />
                    </div>
                </div>
                {!!this.state.comparedPokemons.length &&
                        <div className='pokedex-compare'>
                            {this.state.comparedPokemons.map((item) =>
                                <ComparisonCard key={uuid()} name={item} remove={removeCompare}/>,
                            )}
                    </div>
                }
            </div>
        ) : null;
    }
}

const mapStateToProps = ({ list }: ApplicationState) => ({
    data: list.data,
    loaded: list.loaded,
    loading: list.loading,
  });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchList: () => {
        dispatch(fetchRequest());
        Pokedex.getPokemonsList().then(
            (data: any) => {dispatch(fetchSuccess(data)); },
        );
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
