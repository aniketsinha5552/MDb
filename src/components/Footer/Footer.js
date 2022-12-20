import { ImportExport } from '@mui/icons-material';
import React from 'react'
import SimpleReactFooter from "simple-react-footer";
import "./Footer.css"

export default function Footer({dark}) {
    const description = "This website was created by Aniket Sinha using ReactJs. All the Data on this website is fetched from The Movies Database(TMDB) API. Follow me on social media for more React projects.";
  const title = "About";
  const columns = [
    {
        title: "Resources",
        resources: [
            {
                name: "About",
                link: "/about"
            },
            {
                name: "Careers",
                link: "/careers"
            },
            {
                name: "Contact",
                link: "/contact"
            },
            {
                name: "Admin",
                link: "/admin"
            }
        ]
    },
    {
        title: "Legal",
        resources: [
            {
                name: "Privacy",
                link: "/privacy"
            },
            {
                name: "Terms",
                link: "/terms"
            }
        ]
    },
    {
        title: "Visit",
        resources: [
            {
                name: "Locations",
                link: "/locations"
            },
            {
                name: "Culture",
                link: "/culture"
            }
        ]
    }
 ];
  return (
    <div id="footer" >
    <SimpleReactFooter id="simple-footer"
    description={description} 
    title={title}
    columns={[]}
    linkedin="aniket-sinha-a2ab29241"
    facebook=""
    twitter="aniktsinha5552@gmail.com"
    instagram="aniket._sinha"
    youtube=""
    pinterest=""
    copyright="Aniket Sinha"
    iconColor="black"
    backgroundColor={dark? "#EAE7DC": "#1A1A1D"}
    fontColor={dark? "#1A1A1D": "#EAE7DC"}
    copyrightColor="darkgrey"
 />
    </div>
  )
}

//dark="#1A1A1D" , light= "#EAE7DC"
