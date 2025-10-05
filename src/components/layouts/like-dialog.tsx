import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DelService, GetService, PostService } from '@/services/service';
import { authStore } from '@/store/user';
import type { userLike } from '@/types/user-like';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

interface UserLikeProps {
  id: number;
  onClose: () => void;
}

// const PostServiceAlias = PostService || GetService;
// const DeleteServiceAlias = DeleteService || GetService;

export const UserLike = ({ id, onClose }: UserLikeProps) => {
  const [userLikes, setUserLikes] = useState<userLike[]>([]);
  const [open, setOpen] = useState(true);
  const user = authStore((s) => s.authData);

  const getUserLike = useCallback(async () => {
    try {
      const r = await GetService(`posts/${id}/likes`, user?.token);
      // console.log(r.data.users);
      setUserLikes(r.data.users || []);
    } catch (e: any) {
      console.error('Failed to fetch user likes:', e);
      toast.error(e);
    }
  }, [id, user?.token, toast]);

  useEffect(() => {
    getUserLike();
  }, [getUserLike]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      onClose();
    }
  };

  /**
   * Mengatur operasi Follow/Unfollow dengan Optimistic Update.
   * @param targetUserLike Objek userLike yang akan di-follow/unfollow.
   * @param isFollowing Status saat ini: true jika ingin Unfollow, false jika ingin Follow.
   */
  const handleFollowToggle = async (
    targetUserLike: userLike,
    isFollowing: boolean
  ) => {
    if (!user?.token) return;

    const originalUserLikes = userLikes; // Simpan state asli untuk rollback
    const endpoint = `follow/${targetUserLike.username}`;

    // 1. Optimistic Update (Perubahan UI langsung)
    setUserLikes((currentLikes) =>
      currentLikes.map((u) =>
        u.id === targetUserLike.id
          ? { ...u, isFollowedByMe: !isFollowing } // Balik status follow
          : u
      )
    );

    // 2. Lakukan Panggilan API
    try {
      if (isFollowing) {
        // UNFOLLOW (DELETE)
        await DelService(endpoint, user.token);
        toast.success('sukses unfollow');
      } else {
        // FOLLOW (POST)
        await PostService(endpoint, null, user.token);
        toast.success('sukses follow');
      }
    } catch (error) {
      console.error('Follow/Unfollow API call failed:', error);
      // 3. Rollback jika API gagal
      setUserLikes(originalUserLikes);
      toast.error(
        `title: Gagal ${isFollowing ? 'Unfollow' : 'Follow'} ${targetUserLike.username}`
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='max-h-[80vh] w-full max-w-xs overflow-y-auto border-neutral-500 bg-black p-0 sm:max-w-sm'>
        <div className='space-y-3 px-4 pt-10 pb-4'>
          {userLikes.length === 0 ? (
            <p className='py-4 text-center text-gray-500'>
              Belum ada yang menyukai postingan ini.
            </p>
          ) : (
            userLikes.map((userlike) => (
              <div
                key={userlike.id}
                className='flex items-center justify-between'
              >
                <div className='flex items-center space-x-3'>
                  <div className='h-12 w-12 overflow-hidden rounded-full bg-gray-200'>
                    <img
                      src={userlike.avatarUrl}
                      alt={userlike.name}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='text-sm'>
                    <div className='font-bold'>{userlike.name}</div>
                    <div className='font-normal'>{userlike.username}</div>
                  </div>
                </div>
                {/* Tombol Follow/Unfollow hanya muncul jika BUKAN user sendiri */}
                {!userlike.isMe && (
                  <Button
                    onClick={() =>
                      handleFollowToggle(userlike, userlike.isFollowedByMe)
                    }
                    variant={
                      userlike.isFollowedByMe ? 'secondary' : 'secondary'
                    }
                    className='h-8 px-3 text-sm' // Sesuaikan styling button jika perlu
                  >
                    {userlike.isFollowedByMe ? 'Unfollow' : 'Follow'}
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
