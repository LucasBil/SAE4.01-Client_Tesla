import { describe, it, expect, assert, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest'
import ComptesController from "@/api/ComptesController";
import { ref } from "vue";
import { shallowMount} from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { data } from 'autoprefixer';

vi.mock('axios')

describe('ComptesControllerTests', () => {
    beforeEach(() => {
        axios.get.mockReset()
      })
    
    it('GetAllComptesOK', async () => {

    let comptesToCompare = [
        {
            idCompte: 89,
            idDepartement: null,
            email: 'lucasbill318@icloud.com',
            typeCompte: 'personnel',
            nomCompte: 'Lucas',
            prenomCompte: 'Billy',
            motDePasse: 'e8ec37bfe4e818cc1bb10d1564e1ed7666f75251649ed8606f910306e8b17e00148187bd8ccaf6d683069b550247aa52dd7e9d5460e408df11db9109dafdd087',
            numeroTelephone: null,
            numeroRue: null,
            nomRue: null,
            ville: null,
            codepostal: null,
            nomEntreprise: null,
            derniereConnexion: null,
            dataCollect: false,
            numTVA: null,
            departementNavigation: null,
            sepaNavigation: null,
            cbNavigation: null,
            cvtNavigation: null,
            commAccessoireNavigation: null
        },
        
        {
            idCompte: 94,
            idDepartement: null,
            email: 'jythestin@gmail.com',
            typeCompte: 'personnel',
            nomCompte: 'LEICHTMANN',
            prenomCompte: 'Jimmy',
            motDePasse: 'b901a9d1ce930082d472aac646a620fab499e0a9beb4373473e26f1d88db1f2103842122d29b82d819acdca66077e03c061b4d0f078c2d99653b3c2b76bde138',
            numeroTelephone: null,
            numeroRue: null,
            nomRue: null,
            ville: null,
            codepostal: null,
            nomEntreprise: null,
            derniereConnexion: null,
            dataCollect: false,
            numTVA: null,
            departementNavigation: null,
            sepaNavigation: null,
            cbNavigation: null,
            cvtNavigation: null,
            commAccessoireNavigation: null
        }, 
        
        {
            idCompte: 97,
            idDepartement: null,
            email: 'adlencherif@gmail.com',
            typeCompte: 'personnel',
            nomCompte: 'Chérif',
            prenomCompte: 'Adlen',
            motDePasse: 'd881b594bde5ff542f2b8db405e1b46dbdde25609e71039abfc3fbcebc93d4f4160e2c1ca2bc5f811da86899755048d2fb8038ded4c228376959d723a26a3bb2',
            numeroTelephone: '+33 7 90 35 21 45',
            numeroRue: 1,
            nomRue: 'route de la déquindance',
            ville: 'Madrid',
            codepostal: '56100',
            nomEntreprise: null,
            derniereConnexion: null,
            dataCollect: false,
            numTVA: null,
            departementNavigation: null,
            sepaNavigation: null,
            cbNavigation: null,
            cvtNavigation: null,
            commAccessoireNavigation: null
        }
    ];

    axios.get.mockResolvedValue({
        data: comptesToCompare,
    })

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsdWNhc2JpbGwzMThAaWNsb3VkLmNvbSIsImZ1bGxOYW1lIjoiTHVjYXMiLCJyb2xlIjoiVXNlciIsImp0aSI6IjQzOTRiZjYxLWQzNzgtNGVhMS05ZDE1LWNhZDVlNDEwMDkzMiIsImV4cCI6MTcyODUzMDEwMCwiaXNzIjoiaHR0cHM6Ly9hcGktdGVzbGEuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiYXVkIjoiaHR0cHM6Ly9hcGktdGVzbGEuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.eAUx3gR2Es4bK7GOopSscp9hYhzzD92LM5UNuqnWmos'

    let comptes = await axios.get('https://api-tesla-v2.azurewebsites.net/api/comptes', {headers: {'Authorization': `Bearer ${token}`}})
    comptes = comptes.data.slice(0,3)

    expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/comptes',{headers: {'Authorization': `Bearer ${token}`}})
    expect(comptes).toStrictEqual(comptesToCompare)


    });

    it('GetByIdCompteOK', async () => {

        const compteMock = {
                idCompte: 89,
                idDepartement: null,
                email: 'lucasbill318@icloud.com',
                typeCompte: 'Personnel',
                nomCompte: 'Lucas',
                prenomCompte: 'Billy',
                motDePasse: 'e8ec37bfe4e818cc1bb10d1564e1ed7666f75251649ed8606f910306e8b17e00148187bd8ccaf6d683069b550247aa52dd7e9d5460e408df11db9109dafdd087',
                numeroTelephone: null,
                numeroRue: null,
                nomRue: null,
                ville: null,
                codepostal: null,
                nomEntreprise: null,
                derniereConnexion: null,
                dataCollect: false,
                numTVA: null,
                departementNavigation: null,
                sepaNavigation: null,
                cbNavigation: null,
                cvtNavigation: null,
                commAccessoireNavigation: null
        }

        axios.get.mockResolvedValue({
            data: compteMock,
        })

        const comptebyid = await ComptesController.GetById(89)

        expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/comptes/ById/89')
        expect(comptebyid.data).toStrictEqual(compteMock)

    });

    it('PostCompteOK', async () => {

        const compteToPost = {
            email:        "mock@icloud.com",
            typecompte:   "Personnel",
            prenomcompte: "Mocky",
            nomcompte:    "MacMock",
            motdepasse:   "e8ec37bfe4e818cc1bb10d1564e1ed7666f75251649ed8606f910306e8b17e00148187bd8ccaf6d683069b550247aa52dd7e9d5460e408df11db9109dafdd087"  
        }

        const comptePostMock = {
            idcompte: 1,
            email:        "mock@icloud.com",
            typecompte:   "Personnel",
            prenomcompte: "Mocky",
            nomcompte:    "MacMock",
            motdepasse:   "e8ec37bfe4e818cc1bb10d1564e1ed7666f75251649ed8606f910306e8b17e00148187bd8ccaf6d683069b550247aa52dd7e9d5460e408df11db9109dafdd087"  
        
        }

        axios.post.mockResolvedValue({
            data:comptePostMock
        })

        const newCompte = await ComptesController.Post(compteToPost)

        console.log('mock')
        console.log(comptePostMock)

        console.log('real')
        console.log(newCompte.data)

        expect(axios.post).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/comptes',compteToPost)
        expect(newCompte.data).toStrictEqual(comptePostMock)
    });

    it('PutCompteOK', async () => {

        const compteToPut = {
            idcompte: 1,
            email:        "mock@icloud.com",
            typecompte:   "Personnel",
            prenomcompte: "Mocky",
            nomcompte:    "MacMock",
            motdepasse:   "e8ec37bfe4e818cc1bb10d1564e1ed7666f75251649ed8606f910306e8b17e00148187bd8ccaf6d683069b550247aa52dd7e9d5460e408df11db9109dafdd087"  
        }
        
        const comptePutMock = {
            idcompte: 1,
            email:        "mock@icloud.com",
            typecompte:   "Personnel",
            prenomcompte: "Mocky",
            nomcompte:    "MacMockMic",
            motdepasse:   "e8ec37bfe4e818cc1bb10d1564e1ed7666f75251649ed8606f910306e8b17e00148187bd8ccaf6d683069b550247aa52dd7e9d5460e408df11db9109dafdd087"  
        }

        axios.put.mockResolvedValue({
            data:comptePutMock
        })
        
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsdWNhc2JpbGwzMThAaWNsb3VkLmNvbSIsImZ1bGxOYW1lIjoiTHVjYXMiLCJyb2xlIjoiVXNlciIsImp0aSI6IjQzOTRiZjYxLWQzNzgtNGVhMS05ZDE1LWNhZDVlNDEwMDkzMiIsImV4cCI6MTcyODUzMDEwMCwiaXNzIjoiaHR0cHM6Ly9hcGktdGVzbGEuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiYXVkIjoiaHR0cHM6Ly9hcGktdGVzbGEuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.eAUx3gR2Es4bK7GOopSscp9hYhzzD92LM5UNuqnWmos'
        
        const newCompte = await ComptesController.Put(1,compteToPut,token)
        
        
        expect(axios.put).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/comptes/1',compteToPut, {headers: {'Authorization': `Bearer ${token}`}})
        expect(newCompte.data).toStrictEqual(comptePutMock)
    });

    it('DeleteCompteOK', async () => {

        const compteToDelete = {
            idcompte: 1,
            email:        "mock@icloud.com",
            typecompte:   "Personnel",
            prenomcompte: "Mocky",
            nomcompte:    "MacMock",
            motdepasse:   "e8ec37bfe4e818cc1bb10d1564e1ed7666f75251649ed8606f910306e8b17e00148187bd8ccaf6d683069b550247aa52dd7e9d5460e408df11db9109dafdd087"  
        }
        
        const compteDeleteMock = {
            idcompte: 1,
            email:        "mock@icloud.com",
            typecompte:   "Personnel",
            prenomcompte: "Mocky",
            nomcompte:    "MacMockMic",
            motdepasse:   "e8ec37bfe4e818cc1bb10d1564e1ed7666f75251649ed8606f910306e8b17e00148187bd8ccaf6d683069b550247aa52dd7e9d5460e408df11db9109dafdd087"  
        }

        axios.delete.mockResolvedValue({
            data:compteDeleteMock
        })
        
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsdWNhc2JpbGwzMThAaWNsb3VkLmNvbSIsImZ1bGxOYW1lIjoiTHVjYXMiLCJyb2xlIjoiVXNlciIsImp0aSI6IjQzOTRiZjYxLWQzNzgtNGVhMS05ZDE1LWNhZDVlNDEwMDkzMiIsImV4cCI6MTcyODUzMDEwMCwiaXNzIjoiaHR0cHM6Ly9hcGktdGVzbGEuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiYXVkIjoiaHR0cHM6Ly9hcGktdGVzbGEuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.eAUx3gR2Es4bK7GOopSscp9hYhzzD92LM5UNuqnWmos'
        
        const newCompte = await ComptesController.Delete(1,token)
        
        
        expect(axios.delete).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/comptes/1', {headers: {'Authorization': `Bearer ${token}`}})
        expect(newCompte.data).toStrictEqual(compteDeleteMock)
    });


});