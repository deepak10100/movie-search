import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Container, Flex, FormControl, HStack, Heading, Image, Input, InputGroup, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react';
function App() {
  let [movie, setMovie]= useState([])
  let [search, setSearch]= useState("")
  let onhangeHandler = (e)=>{
    setSearch(e.target.value)
  }
  useEffect(() => {
    if (search === '') {
      getAllMovies()
      
    }
    else{
    getSearchMovies()
    }
  }, [])

  
  let getAllMovies = async ()=>{

const options = {
  method: 'GET',
  url: 'https://movies-api14.p.rapidapi.com/movies',
  headers: {
    'x-rapidapi-key': 'cbb75ef3e2msha58ce5d409d757ep122664jsn890a023e635f',
    'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data.movies);
  setMovie(response.data.movies)
} catch (error) {
	console.error(error);
}

  }

  let getSearchMovies = async ()=>{
    const options = {
      method: 'GET',
      url: 'https://movies-api14.p.rapidapi.com/search',
      params: {
        query: `${search}`
      },
      headers: {
        'x-rapidapi-key': 'cbb75ef3e2msha58ce5d409d757ep122664jsn890a023e635f',
        'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data.contents);
      setMovie(response.data.contents)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Container maxW={'container.xl'} p={4}>
        <Heading as={'h1'} textAlign={'center'} my={4} >Movie Search</Heading>
      <FormControl>
        <InputGroup>
        <Input type="text" value={search} onChange={onhangeHandler} placeholder="Search Movie..." />
        <Button onClick={()=>getSearchMovies(search)} colorScheme='facebook' mx={2} >Search</Button>
        </InputGroup>
      </FormControl>
       
      <Flex  my={7} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} gap={7}>
      
         {
           movie? movie?.map((item)=>(
            <Card width={'xs'} key={item._id}>
            <CardHeader>

              <Image  objectFit={'cover'} src={item.poster_path} alt='Dan Abramov' />
            </CardHeader>
            <CardBody>
              <Heading as={'h2'} fontSize={'2xl'} >{item.title}</Heading>
              <Text as={'p'}> {item.overview.slice(0,130)}....</Text>
            </CardBody>
            
          <Flex flexWrap={'wrap'} gap={2} p={2}>
          {
              item.genres.map((genre,i)=>(
                <Badge as={'span'} key={i} px={2} borderRadius={'lg'} colorScheme='twitter' > {genre}</Badge>
              ))
            }
          </Flex>
            <CardFooter>
            <Badge as={'span'} px={2} borderRadius={'lg'} colorScheme='whatsapp' > {item.release_date}</Badge>
           
            </CardFooter>
          </Card>
           ))
           :
           ""
         }
          
      
      </Flex>
      </Container>
    </>
  )
}

export default App
