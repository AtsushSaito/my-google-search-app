import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Link, 
  Container, 
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';

// Google検索結果の型定義
interface GoogleItem {
  title: string;
  link: string;
  snippet: string;
}

// Brave検索結果の型定義
interface BraveItem {
  title: string;
  url: string;
  description: string;
}

// コンポーネントのpropsの型定義
interface ResultsListProps {
  data: {
    engine: 'google' | 'brave';
    data: {
      items?: GoogleItem[];  // Google用
      web?: {               // Brave用
        results?: BraveItem[];
      };
    };
  };
}

// ResultsListコンポーネント
const ResultsList: React.FC<ResultsListProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 検索エンジンに応じた結果アイテムの取得
  const getResultItems = () => {
    if (data.engine === 'google') {
      return data.data.items || [];
    } else {
      // Brave検索の結果形式に合わせる
      return data.data.web?.results || [];
    }
  };

  // アイテムのプロパティを取得するヘルパー関数
  const getItemTitle = (item: GoogleItem | BraveItem) => {
    // Google/Braveともにtitleプロパティあり
    return item.title;
  };

  const getItemLink = (item: GoogleItem | BraveItem) => {
    if (data.engine === 'google') {
      return (item as GoogleItem).link;
    } else {
      return (item as BraveItem).url;
    }
  };

  const getItemSnippet = (item: GoogleItem | BraveItem) => {
    if (data.engine === 'google') {
      return (item as GoogleItem).snippet;
    } else {
      return (item as BraveItem).description;
    }
  };

  const resultItems = getResultItems();

  return (
    <Container 
      maxWidth="md" 
      disableGutters={isMobile}
      sx={{ 
        py: { xs: 2, sm: 4 },
        px: { xs: 0, sm: 2 }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 2 } }}>
        {resultItems.map((item: GoogleItem | BraveItem) => (
          <Card 
            key={getItemLink(item)} 
            variant="outlined" 
            sx={{ 
              borderRadius: { xs: isMobile ? 0 : 1, sm: 1 },
              mx: { xs: isMobile ? 0 : 1, sm: 0 },
              '&:hover': { 
                boxShadow: 3,
                transition: 'box-shadow 0.3s ease-in-out'
              }
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                component="div" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  lineHeight: 1.3
                }}
              >
                <Link 
                  href={getItemLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="primary"
                >
                  {getItemTitle(item)}
                </Link>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: '0.875rem', sm: '0.975rem' },
                  lineHeight: 1.5
                }}
              >
                {getItemSnippet(item)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ResultsList;