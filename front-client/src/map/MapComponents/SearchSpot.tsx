import '../Map.css';
import "leaflet/dist/leaflet.css";
import { borderRadius } from '@mui/system';
import { createTheme, useTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Box, IconButton, Popper, TextField, Grid2 } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';

/** <<SearchSpot>>
 *    - Search spots that was entered in the textfield box.
 *    - Make a list of searched places.
 */

/**CSS *******************************************/
const SearchTextField = styled(TextField)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#e8e8e8' : '#fff',
    marginLeft: '0px',
    width: '70%',
    ...theme.typography.body2, // Typographyのデフォルトのフォント定義を使用する
    textAlign: 'left',
    color: '#000',
    borderRadius: '5px',
    // border: 'none',
  }));
/**CSS end ***************************************/

const SearchSpot = () => {
    return (
        <Box>          
        <Grid2 container spacing={2}>
          {/* <Grid item xs={3}>  - MUI v5の場合 */}
          <Grid2 size={{ xs: 3 }}>
            <SearchTextField 
              id="searching" 
              label="Search..." 
              variant="outlined" 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => (e.currentTarget.value)}
            />
          </Grid2>
        </Grid2>
      </Box>
    )
}

export default SearchSpot;