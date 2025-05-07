import { useState, useCallback } from 'react'
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
  useTheme,
  Snackbar,
  Alert
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [query, setQuery] = useState('')
  const [searchCount, setSearchCount] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const { data, isLoading, error } = useSearch(query)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // エラーメッセージを表示するかどうか
  const showError = Boolean(errorMsg)

  // 検索処理
  const handleSearch = useCallback(() => {
    // 検索キーワードが空の場合は処理しない
    if (!keyword?.trim()) {
      setErrorMsg('検索キーワードを入力してください')
      return
    }
    
    // 検索カウンターをインクリメントすることで強制的に再検索を実行
    setSearchCount(prev => prev + 1)
    setQuery(keyword.trim())
    
    // デバッグ用
    console.log(`検索実行: "${keyword.trim()}" (${searchCount + 1}回目)`)
  }, [keyword, searchCount])

  // Enterキー押下時の処理
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // エラーメッセージを閉じる
  const handleCloseError = () => {
    setErrorMsg('')
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
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ mb: isMobile ? 1 : 0 }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              disabled={isLoading}
              sx={{ 
                height: isMobile ? 40 : 56, 
                width: isMobile ? '100%' : 'auto',
                px: 3 
              }}
            >
              {isLoading ? '検索中...' : '検索'}
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
        ) : data && data.items?.length > 0 ? (
          <SearchResult data={data} />
        ) : query ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1">検索結果がありません</Typography>
          </Box>
        ) : null}
      </Container>

      {/* エラーメッセージ表示用のSnackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="warning" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  )
}

