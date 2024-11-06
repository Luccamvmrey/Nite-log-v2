import {useEffect, useState} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";
import useMutateUser from "@/modules/common/hooks/user/useMutateUser.ts";
import useQueryUser from "@/modules/common/hooks/user/useQueryUser.ts";

const QrCodeScanner = () => {
    const {addToAttendanceMutation} = useMutateUser();
    const {userQuery} = useQueryUser();

    const [qrResult, setQrResult] = useState("");
    const qrcodeRegionId = "html5qr-code-full-region";

    useEffect(() => {
        if (!qrResult) return;
        if (userQuery.data) {
            const {data: user} = userQuery.data;
            const meetingCode = Number(qrResult);

            addToAttendanceMutation.mutate({
                userId: user.id,
                meetingCode
            });
        }
    }, [qrResult]);

    useEffect(() => {
        const qrCodeScanner = new Html5QrcodeScanner(
            qrcodeRegionId,
            {fps: 10, qrbox: 250},
            true
        );

        const requestCamera = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({video: true});
            } catch (error) {
                console.log(error);
            }
        }

        const initializeScanner = () => {
            const onSuccess = (decodedText: string) => {
                setQrResult(decodedText);
            }

            const onError = (err: string) => {
                console.warn(err);
            }

            qrCodeScanner.render(onSuccess, onError);
        }

        requestCamera().then(() => {
            initializeScanner()
        })

        return () => {
            qrCodeScanner.clear().catch(error => {
                console.warn(error);
            })
        };
    }, []);

    return (
        <main className="container flex flex-col items-center h-full w-full gap-4 py-4 px-8">
            <div id={qrcodeRegionId}/>
        </main>
    );
};

export default QrCodeScanner;