/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getInboxes } from '@/features/auth/data/api';
import useInboxesStore from '@/store/inboxes.store';
import inboxType from '@/type/inboxType';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';

const useInboxButton = () => {
    const menuRef = useOnClickOutside(() => setShowMenu(false));
    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { inboxes, setInboxes, deleteInbox } = useInboxesStore((state) => ({
        inboxes: state.inboxes,
        setInboxes: state.setInboxes,
        deleteInbox: state.deleteInbox,
    }));

    useEffect(() => {
        getInboxes(page)
            .then((result) => {
                const inboxesToStore = result.data.data.data.filter((resultItem: inboxType) => {
                    let isExist = inboxes.find((inboxItem) => inboxItem.id === resultItem.id);
                    if (!isExist) {
                        return resultItem;
                    }
                });

                inboxesToStore.length > 0 && setInboxes([...inboxes, ...inboxesToStore]);
            })
            .catch(() => {
                return;
            });
    }, [page, deleteInbox]);

    return {
        menuRef,
        setShowMenu,
        showMenu,
        page,
        lastPage,
        setPage,
    };
};

export default useInboxButton;
