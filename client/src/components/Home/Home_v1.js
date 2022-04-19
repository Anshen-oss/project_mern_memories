// import React, { useState } from 'react';
// import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
// import { useDispatch } from 'react-redux';
// import { useHistory, useLocation } from 'react-router-dom';
// import ChipInput from 'material-ui-chip-input';

// import { getPostsBySearch } from '../../actions/posts';
// import Posts from '../Posts/Posts';
// import Form from '../Form/Form';
// import Pagination from '../Pagination';
// import useStyles from './styles';

// /**
//  * @function useQuery
//  * @return {string} return a new url
//  * nous devons également configurer nos paramètres de recherche d'URL, nous
//  * allons l'utiliser pour savoir sur quelle page sommes-nous actuellement et
//  * quel terme de recherche recherchons-nous pour faire réagir le routeur dom
//  *
//  * Le hook useLocation est une fonction qui renvoie l'objet location qui contient
//  * des informations sur l'URL actuelle et possède les propriétés:
//  * hash, pathname, search, state, key
//  * @see https://www.kindacode.com/article/react-router-uselocation-hook-tutorial-and-examples/
//  *
//  * const query = useQuery(); d'où nous obtiendrons les informations de la page
//  * const page = query.get('page'); - va lire notre url et voir s'il y a un
//  * paramètre page à l'intérieur
//  */
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// const Home = () => {
//   const classes = useStyles();
//   const query = useQuery();
//   const page = query.get('page') || 1;
//   const searchQuery = query.get('searchQuery');

//   const [currentId, setCurrentId] = useState(0);
//   const dispatch = useDispatch();

//   const [search, setSearch] = useState('');
//   const [tags, setTags] =useState([]);
//   const history = useHistory();

//   /**
//    * @function searchPost
//    * @description - Demander à la BDD de retourner le post qui correspond à la requête
//    * First use a redux action in actions/post.js and a reducer in reducer/posts.js
//    * to manage our post
//    */
//   const searchPost = () => {
//      if (search.trim() || tags) {
//       // param search come from state - Nous devons rendre un string car nous ne
//       // voulons pas passer un array dans l'url
//       // ['europe', 'France'] => 'europe, usa'
//         dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
//         history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
//     } else {
//       history.push('/');
//     }
//   };

//   /**
//    * @function handleKeyPress
//    * @param {string} e - event
//    * @param {string} return the term that it searched
//   */
//   const handleKeyPress = (e) => {
//     if(e.keyCode === 13) {
//       searchPost();
//     }
//   }

//   /**
//    *
//    * @function handleAddChip - Modifie le state
//    * @param {string} tag -
//    * @description setTags([]) - Lorsque vous avez un array avec setState() vous devez
//    * tout d'abord déstructurer le state et ensuite ajouter le nouveau state dessus:
//    * setTags([...tags])
//   */
//    const handleAddChip = (tag) => setTags([...tags, tag]);


//   /**
//    * @function handleDeleteChip - tag to delete
//    * @param {string} chipToDelete
//    */
//   const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

//    return (
//     <Grow in>
//       <Container maxWidth="xl">
//         <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
//           <Grid item xs={12} sm={6} md={9}>
//             <Posts setCurrentId={setCurrentId} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <AppBar className={classes.appBarSearch} position="static" color="inherit">
//               <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
//               <ChipInput
//                 style={{ margin: '10px 0' }}
//                 value={tags}
//                 onAdd={(chip) => handleAddChip(chip)}
//                 onDelete={(chip) => handleDeleteChip(chip)}
//                 label="Search Tags"
//                 variant="outlined"
//               />
//               <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
//             </AppBar>
//             <Form currentId={currentId} setCurrentId={setCurrentId} />
//             {(!searchQuery && !tags.length) && (
//               <Paper className={classes.pagination} elevation={6}>
//                 <Pagination page={page} />
//               </Paper>
//             )}
//           </Grid>
//         </Grid>
//       </Container>
//     </Grow>
//   );
// };

// export default Home;

// /**
//  * je ne veux pas toujours afficher la pagination je veux seulement l'afficher
//  * si nous visualisons le contenu par pages mais si vous faites la recherche
//  * je vais supposer que l'utilisateur n'a pas beaucoup de messages à rechercher
//  * de 10 20 ou 30. de cette façon, nous n'avons pas besoin de paginer, donc ce
//  * que nous pouvons faire, c'est que nous pouvons encapsuler cela dans un bloc
//  * dynamique et dire si nous n'avons pas actuellement de requête de recherche
//  * et si nous n'avons pas toutes les balises pour que nous puissions faire des
//  * tags.length dans ce cas, nous voulons montrer notre pagination, alors une
//  * fois de plus, laissez-moi simplement mettre ceci ici si nous n'avons pas de
//  * requête de recherche et si nous n'avons pas de balises dans ce cas, je voulons
//  * rendre la pagination si nous avons la recherche ou les balises dans ce cas,
//  * nous ne voulons pas rendre la pagination maintenant que nous avons que nous
//  * pouvons également ajouter le nom de la classe ici et ce sera la pagination
//  * par points des classes:
//  *  {(!searchQuery && !tags.length) && (
//               <Paper className={classes.pagination} elevation={6}>
//                 <Pagination page={page} />
//               </Paper>
//             )}
//  */


import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
