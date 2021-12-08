import { Badge, Box, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    profilePic: {
        height: 55,
        width: 55,
        background: 'red'
      },
      badge: {
        height: '13px!important',
        width: 13,
        borderRadius: "50%!important",
        border: "2px solid white",
        backgroundColor: "#D0DAE9"
      },
      online: {
        backgroundColor: "#1CED84"
      },
      sidebar: {
        marginLeft: 17
      }
}))

const BadgeAvatar = (props: any) => {
    const classes = useStyles();
    const { sidebar, username, online, photoUrl } = props;

    return (
        <Box className={sidebar ? classes.sidebar : ""}>
            <Badge
                classes={{ badge: `${classes.badge} ${online && classes.online}` }}
                variant="dot"
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <Avatar alt={username} src={photoUrl} className={classes.profilePic}></Avatar>
            </Badge>
        </Box>
    )
}

export default BadgeAvatar;