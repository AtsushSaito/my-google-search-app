import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Link, 
  Container, 
  Box,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';

// データアイテムの型定義
interface Item {
  title: string;
  link: string;
  snippet: string;
}

// コンポーネントのpropsの型定義
interface ResultsListProps {
  data: {
    items?: Item[];
  };
}

// ResultsListコンポーネント
const ResultsList: React.FC<ResultsListProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        {data.items?.map((item: Item) => (
          <Card 
            key={item.link} 
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
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="primary"
                >
                  {item.title}
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
                {item.snippet}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ResultsList;