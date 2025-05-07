import { useState } from 'react'
import useSearch from '../hooks/useSearch'
import SearchResult from '../components'
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper,
  AppBar,
  Toolbar,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function Home() {
  const [keyword, setKeryword] = useState('')
  const [query, setQuery] = useState('')
  const { data, isLoading, error } = useSearch(query)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSearch = () => {
    if (!keyword?.trim()) return
    setQuery(keyword)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Google Search App
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, px: { xs: 2, sm: 3 } }}>
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center', 
              gap: 1 
            }}
          >
            <TextField
              fullWidth
              label="検索キーワード"
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              value={keyword}
              onChange={(e) => setKeryword(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ mb: isMobile ? 1 : 0 }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              sx={{ 
                height: isMobile ? 40 : 56, 
                width: isMobile ? '100%' : 'auto',
                px: 3 
              }}
            >
              検索
            </Button>
          </Box>
        </Paper>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" variant="body1" sx={{ px: 2 }}>
            エラーが発生しました: {error.toString()}
          </Typography>
        ) : data && (
          <SearchResult data={data} />
        )}
      </Container>
    </>
  )
}

