import { useState, useCallback } from 'react'
import useSearch, { SearchEngineType } from '../hooks/useSearch'
import useSearchHistory from '../hooks/useSearchHistory'
import SearchResult from '../components'
import SearchHistory from '../components/SearchHistory'
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
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import GoogleIcon from '@mui/icons-material/Google'
import BraveIcon from '@mui/icons-material/Security' // Braveアイコン用
import HistoryIcon from '@mui/icons-material/History'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [query, setQuery] = useState('')
  const [searchCount, setSearchCount] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [searchEngine, setSearchEngine] = useState<SearchEngineType>('google')
  const { data, isLoading, error } = useSearch(query, searchEngine)
  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [historyExpanded, setHistoryExpanded] = useState(false)

  // エラーメッセージを表示するかどうか
  const showError = Boolean(errorMsg)

  // 検索エンジンの切り替え
  const handleSearchEngineChange = (
    event: React.MouseEvent<HTMLElement>,
    newEngine: SearchEngineType | null,
  ) => {
    if (newEngine !== null) {
      setSearchEngine(newEngine);
      console.log('検索エンジンを切り替えました:', newEngine);
      
      // 検索中の場合は、新しいエンジンで再検索
      if (query) {
        setSearchCount(prev => prev + 1);
      }
    }
  };

  // 検索処理
  const handleSearch = useCallback(() => {
    // 検索キーワードが空の場合は処理しない
    if (!keyword?.trim()) {
      setErrorMsg('検索キーワードを入力してください')
      return
    }
    
    // 検索カウンターをインクリメントすることで強制的に再検索を実行
    setSearchCount(prev => prev + 1)
    const trimmedKeyword = keyword.trim()
    setQuery(trimmedKeyword)
    
    // 検索履歴に追加
    addToHistory(trimmedKeyword, searchEngine)
    
    // デバッグ用
    console.log(`検索実行: "${trimmedKeyword}" (${searchCount + 1}回目, エンジン: ${searchEngine})`)
  }, [keyword, searchCount, searchEngine, addToHistory])

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

  // 履歴から検索を実行
  const handleSearchFromHistory = (historyQuery: string, historyEngine: SearchEngineType) => {
    setKeyword(historyQuery)
    setSearchEngine(historyEngine)
    setQuery(historyQuery)
    setSearchCount(prev => prev + 1)
    setHistoryExpanded(false)
  }

  return (
    <>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Search App
          </Typography>
          
          {/* 検索エンジン切り替えボタン */}
          <ToggleButtonGroup
            value={searchEngine}
            exclusive
            onChange={handleSearchEngineChange}
            aria-label="検索エンジン選択"
            size="small"
            color="standard"
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.15)', 
              '& .MuiToggleButton-root': { 
                color: 'white',
                '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.25)' }
              }
            }}
          >
            <ToggleButton value="google" aria-label="Google検索">
              <GoogleIcon sx={{ mr: 1 }} /> Google
            </ToggleButton>
            <ToggleButton value="brave" aria-label="Brave検索">
              <BraveIcon sx={{ mr: 1 }} /> Brave
            </ToggleButton>
          </ToggleButtonGroup>
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
          
          {/* 検索履歴アコーディオン */}
          <Accordion 
            expanded={historyExpanded} 
            onChange={() => setHistoryExpanded(!historyExpanded)}
            sx={{ mt: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="search-history-content"
              id="search-history-header"
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HistoryIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="subtitle2">検索履歴</Typography>
                <Box 
                  component="span" 
                  sx={{ 
                    ml: 1, 
                    bgcolor: 'primary.main', 
                    color: 'white', 
                    borderRadius: '50%',
                    width: 22, 
                    height: 22, 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}
                >
                  {history.length}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ mb: 2 }} />
              <SearchHistory 
                history={history}
                onSearchFromHistory={handleSearchFromHistory}
                onRemoveHistoryItem={removeFromHistory}
                onClearHistory={clearHistory}
              />
            </AccordionDetails>
          </Accordion>
        </Paper>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" variant="body1" sx={{ px: 2 }}>
            エラーが発生しました: {error.toString()}
          </Typography>
        ) : data ? (
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

