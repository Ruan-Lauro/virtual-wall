"use client"

import Nav from '@/components/Nav/Navbar'
import '../home-Wall/homeGroup.css'
import { useUserContext, user } from '@/context/VirtualContext'
import { useLogin } from '@/hooks/useLogin'
import { Key, useEffect, useState } from 'react'
import C from '@/components/createWall/ShowWall/ShowWall'
import { useRouter } from 'next/navigation'
import { log } from 'console'
import ShowWall from '@/components/createWall/ShowWall/ShowWall'

const HomeGroup = () =>{

    const [imgperfil, setImgPerfil] = useState("")
    const {handleNameChange, infor} = useUserContext()
    const [codGroup, setCodGroup] = useState("")
    const {data} = useLogin()
    const router = useRouter()

    useEffect(()=>{


        if(infor?.isAdmmin == true){
            setImgPerfil(infor.group?.imageGroup!)
        }else{
            setImgPerfil(infor?.imgUser || "")
            const user = data.find((test) =>  infor?.nameWall?.find((tes) => test.group?.codigo === tes.codGroup ));
        }
    })

    const handleWall = (codGroup:string) =>{
        const updatedUser = {
            ...infor!,
            rota: {
                namewall: "",
                codGroup: codGroup
            }
        };
        handleNameChange(updatedUser);
        router.push('/user/home-Wall')
    }

    return(
        <main className='all-inf-show-wall'>
            <Nav ImageGroup={imgperfil||''}/>
            
            <section className='inforGroup'>
            <div className='inforGroup-text'>
            <p>GRUPOS</p>
            </div>
            <div className='inforGroup-wall'>
                <>
                {data
                    .filter((value) =>
                    infor?.nameWall?.some((valueUser) => value.group?.codigo === valueUser.codGroup)
                )
                .map((filteredValue) => (
                    <ShowWall functCod={handleWall} key={filteredValue.group?.codigo} name={filteredValue.group?.nameGroup!} img={filteredValue.group?.imageGroup!} codGroup={filteredValue.group?.codigo}/>
                ))}
                    
                </>
            </div>
            </section>
        </main>
    )
}

export default HomeGroup